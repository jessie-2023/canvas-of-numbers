import { useEffect, useRef, useState} from "react";
import GapGeneral from "../models/GapGeneral";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import chroma from "chroma-js";


// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GenderGap()
{
    const [barData, setBarData] = useState({
        labels: [],
        datasets: [
            {
                label: "",
                data: [], 
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                barThickness: 3, 
                hoverBackgroundColor: "rgba(75, 192, 192, 1)",
                population: [],
                gdp: [],          
            },
        ],
    });
    const [countryIds, setCountryIds] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const barRef = useRef(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        fetch(`http://localhost:5287/gender-gap/general/2019`)
        .then(response => response.json())
        .then(data => {
            const regionList = [...new Set(data.map((item: GapGeneral) => item.regionName))];
            const countryList = data.map((item: GapGeneral) => item.countryName);
            const colorsHover = chroma.scale("Set3").colors(regionList.length);
            const colors = colorsHover.map(color => chroma(color).alpha(0.5).css()); 

            const subsetsByRegion = regionList.map((region, index) => {
                const eachRegion = {
                    label: region as string,
                    data: data.map((item: GapGeneral) => 
                        item.regionName === region ? item.generalGap : null),
                    backgroundColor: colors[index],
                    barThickness: 5,
                    hoverBackgroundColor: colorsHover[index],
                    population: data.map((item: GapGeneral) => 
                        item.regionName === region ? item.population : null),
                    gdp: data.map((item: GapGeneral) => 
                        item.regionName === region ? item.gdpPerCapita : null),
                }
                return eachRegion;
            });
            
            setBarData({
                labels: countryList,
                datasets: subsetsByRegion,
            });

            setCountryIds(data.map((item: GapGeneral) => item.countryId));
            setLoading(false);
        })
        .catch(() => setError(true))
    }, []);

    
    const handleBarClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const chart = barRef.current;
        if (chart) {
            const elements = getElementAtEvent(chart, event);

            if (elements.length > 0) {
                const clickedBar = elements[0].index;
                const countryId = countryIds[clickedBar];
                console.log("clicked");
                navigate(`/gender-gap/country/${countryId}`);
            }     
        }
    }

    const barOptions = {
        normalized: true, // inform data is indexed & sorted 
        indexAxis: 'y' as string,
        scales: {
             x: {
                max: 1,
                min: 0,
                ticks: {
                    autoskip: false,
                    stepSize: 0.1,
                    font: {
                        size: 7,
                    },
                },
                grid: {
                    display: true,
                },
             },
             y: {
                stacked: true,
                ticks: {
                    autoSkip: false,
                    font: {
                        size: 7,
                    },
                },
                grid: {
                    display: false,
                },
            }
        },
        maintainAspectRatio: false,
        responsive:true,
        plugins: {
            title: {
                display: true,
                text: "The global gender gap score in 2024 for all 146 countries included stands at 68.5% closed. It will take 134 years to reach full parity",
            },
            legend: {
                display: false,
                // position: "right",
                // labels: {
                //     usePointStyle: true,
                //     pointStyle: 'circle',
                //     font: {
                //         size: 4,
                //     }
                // }
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: TooltipItem<"bar">) => {
                        const label = tooltipItem.dataset.label || "";
                        const value = tooltipItem.raw as number;
                        const pop = tooltipItem.dataset.population[tooltipItem.dataIndex];
                        const gdp = tooltipItem.dataset.gdp[tooltipItem.dataIndex];
                        return [
                            `${label}`, 
                            `General Gap: ${value}`, 
                            `Population: ${pop}`,
                            `GDP per Capita: ${gdp}`,
                        ];
                    }
                }
            },
        },
    };

    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data.</p>;

    return (
        <div>
            <div className="chart-container">
                <Bar 
                    ref={barRef}
                    data={barData}
                    options={barOptions}
                    onClick={handleBarClick}
                />
            </div>
        </div>
    )
}