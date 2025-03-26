import { useEffect, useState, useRef } from "react";
import Gap from "../models/Gap";
import { useParams } from "react-router-dom";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LegendItem,
} from "chart.js";

import * as d3  from 'd3-scale';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, Title, Tooltip, Legend);

// Helper function for generating color gradients, no need to DEFINE it in every render
const generateMultiStopGradient = (colors: string[], steps: number) => {
    
    const colorScale = d3.scaleLinear<string>()
      .domain(colors.map((_, i) => i / (colors.length - 1))) 
      .range(colors); 

    return Array.from({ length: steps }, (_, i) => colorScale(i / (steps - 1)));
  };


export default function CountryGenderGap()
{
    const chartRef = useRef(null);
    const { id } = useParams();
    const [countryData, setCountryData] = useState<Gap[]>([]);
    const [mixedChartData, setMixedChartData] = useState({
        labels: [],
        datasets: [] as unknown[], //reducing redundancy & allow properties varies across chart types
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        fetch(`http://localhost:5287/gender-gap/country/${id}`)
        .then(response => response.json())
        .then(data => {
            setCountryData(data);

            const colors = generateMultiStopGradient(["#658cbb", '#d1768f'], 4);

            setMixedChartData({
                labels: data.map((item: Gap) => item.year),
                datasets: [{
                        type: 'line',
                        label: "Health and Survival",
                        data: data.map((item: Gap) => item.healthGap),
                        borderColor: colors[0], //line
                        backgroundColor: colors[0], //line filling 
                        //pointBorderColor, pointBackgroundColor match by default
                        borderWidth: 3, //thickness
                        //pointRadius match
                        tension: 0, //no curving
                    },
                    {
                        type: 'line',
                        label: "Educational Attainment",
                        data: data.map((item: Gap) => item.educationGap),
                    borderColor: colors[1],
                    backgroundColor: colors[1],
                    borderWidth: 3,
                    tension: 0,
                    },
                    {
                        type: 'line',
                        label: "Economic Participation and Opportunity",
                        data: data.map((item: Gap) => item.economicalGap),
                        borderColor: colors[2],
                        backgroundColor: colors[2],
                        borderWidth: 3,
                        tension: 0,
                    },
                    {
                        type: 'line',
                        label: "Political Empowerment",
                        data: data.map((item: Gap) => item.politicalGap),
                        borderColor: colors[3],
                        backgroundColor: colors[3],
                        borderWidth: 3,
                        tension: 0,              
                    },
                    {
                        type: 'bar',
                            label: "General Index - average of the four",
                            data: data.map((item: Gap) => item.generalGap),
                            backgroundColor: "#87ceeb",
                            barThickness: 20,
                    },],
            });

            setLoading(false);
        })
        .catch(() => setError(true))
    }, [id]);


    const chartOption = {
        maintainAspectRatio: false,
        responsive:true,
        plugins: {
            title: {
                display: true,
                text: "The gender gap index is the average of parity index across the four dimensions",
            },
            // legend: {
            //     labels: {
            //         generateLabels: (chart) => {
            //             const chartInstance = chartRef.current?.chartInstance;
            //             if (chartInstance) {
            //                 const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
            //                 labels.forEach((label) => {
            //                 const dataset = chart.data.datasets[label.datasetIndex];
            //                 if (dataset.type === "line") {
            //                     labels.usePointStyle = true;
            //                 } 
            //             })
            //             }
                        
            //         }
            //     }
            // }
        },
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data.</p>;

    return (
        <div>           
            {countryData.length > 0 && (<div>
            <h3>{countryData[0].countryName}, {countryData[0].year} - {countryData[countryData.length - 1].year}</h3>
            <h4>Region: {countryData[0].regionName}</h4>

            <div className="chart-container">
                <Chart
                    ref={chartRef}
                    type="line" 
                    data = {mixedChartData} 
                    options={chartOption} 
                />
            </div>
            </div>)}
        </div>
    )
}