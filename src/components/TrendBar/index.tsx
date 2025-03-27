
import { useEffect, useState } from 'react';
import { AxisX } from './AxisX';
import { AxisY } from './AxisY';
import { Marks } from './Marks';
import Gap from '../../models/Gap';
import { index, scaleBand, scaleLinear, scaleOrdinal, stack } from 'd3';
import { ColorLegend } from './ColorLegend';
import { getGenderGaps } from '../../api/gitGistClient';



const margin = { top: 10, right: 200, bottom: 15, left: 200 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;
// const xAxisTickFormat = timeFormat('%m/%d/%Y');
const fadeOpacity = 0.1;


const colorLegendLabel = 'Dimensions of Gender Parity';
const parityDimensions = ["Health and Survival", "Educational Attainment", "Economic Participation and Opportunity", "Political Empowerment"]

export const TrendBar = ({width, height, setClickedYear , clickedYear, clickedCountry}) => {
  

  const [gaps, setGaps] = useState<Gap[]>();
  const [hoveredValue, setHoveredValue] = useState(null);

  useEffect(() => {
    getGenderGaps().then((data: Gap[]) => {
      setGaps(data.filter(gap => gap.countryId === clickedCountry));
    });
  }, [clickedCountry]); 

  if (!gaps || !gaps.length) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const wideToLong = gaps
    .flatMap( g => [
      {year: String(g.year), subType: parityDimensions[0], subGap: g.healthGap / 4},
      {year: String(g.year), subType: parityDimensions[1], subGap: g.educationGap / 4},
      {year: String(g.year), subType: parityDimensions[2], subGap: g.economicalGap / 4},
      {year: String(g.year), subType: parityDimensions[3], subGap: g.politicalGap / 4},
    ])

  const stacked = stack()
      .keys(parityDimensions)
      .value(([, group], key) => group.get(key).subGap)
    (index(wideToLong, s => s.year, s => s.subType))

  // console.log(stacked)  

  const xValue = (i) => String(i + 2005)
  const xScale = scaleBand()
    .domain(wideToLong.map(d => d.year))
    .range([0, innerWidth])
    .paddingInner(0.15);
  // console.log(`x: ${xValue(stacked[0], 0)}`)
  
  const yScale = scaleLinear()
    .domain([0, 0.892]) // replace hard coding with max() later
    .range([innerHeight, 0]);
  // console.log(`y: ${yValue(stacked[0], 0)}`)

  const colorValue = (s) => s.key;
  const colorScale = scaleOrdinal()
    .domain(parityDimensions) 
    .range(["#BA5F06", "#BD8F22", "#F6B656", "#F2DA57"])
  // console.log(`color: ${colorValue(stacked[0])}`)

  const hoveredDimension = stacked.filter(s => hoveredValue === s.key);

  return (<>
    <rect width={width} height={height} fill="red" opacity={0.05} />
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisX
          xScale={xScale}
          innerHeight={innerHeight}
        />
        <AxisY yScale={yScale} innerWidth={innerWidth} tickOffset={5}/>
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${innerHeight /
            2}) rotate(-90)`}
        >
          Gender Gap in {gaps[0].countryName}
        </text>
        <g transform={`translate(${innerWidth + 60}, 60)`}>
          <text x={35} y={-25} className="axis-label" textAnchor="middle">
            {colorLegendLabel}
          </text>
          <ColorLegend
            tickSpacing={22}
            tickSize={15}
            tickTextOffset={35}
            colorScale={colorScale}
            onHover={setHoveredValue}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
            xScale={xScale}
          />
        </g>
        <g opacity={hoveredValue ? fadeOpacity : 1}>
          <Marks
            stacked={stacked}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            xValue={xValue}
            colorValue={colorValue}
            innerHeight={innerHeight}
            setClickedYear={setClickedYear}
            clickedYear={clickedYear}
          />
        </g>
        <g opacity={0.8}>
        <Marks 
          stacked={hoveredDimension}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale}
          xValue={xValue}
          colorValue={colorValue}
          innerHeight={innerHeight}
          setClickedYear={setClickedYear}
          clickedYear={clickedYear}
        />
        </g>
      </g>
    </>);
};
