import { scaleLinear } from "d3-scale";
import { interpolateGnBu as colorGradience } from "d3";

interface ColorLegendProps {
  colorScale: (value: number) => string;
  width?: number;
  height?: number;
}

export const ColorLegend = ({ colorScale, width = 300, height = 50 }: ColorLegendProps) => {
  const legendWidth = width;
  const legendHeight = height;
  const numTicks = 5; // Number of tick marks

  // Generate tick values
  const legendScale = scaleLinear()
    .domain(colorScale.domain()) // Use the same domain as the color scale
    .range([0, legendWidth]);

  const tickValues = legendScale.ticks(numTicks);

  return (
    <svg width={legendWidth} height={legendHeight + 20}>
      {/* Gradient Bar */}
      <defs>
        <linearGradient id="legend-gradient" x1="0%" x2="100%">
          {legendScale.ticks(10).map((t, i) => (
            <stop key={i} offset={`${(i / 10) * 100}%`} stopColor={colorScale(t)} />
          ))}
        </linearGradient>
      </defs>
      <rect width={legendWidth} height={legendHeight} fill="url(#legend-gradient)" />

      {/* Ticks & Labels */}
      {tickValues.map((tick, i) => (
        <g key={i} transform={`translate(${legendScale(tick)}, ${legendHeight+10}) rotate(90)`}>
          {/* <line x2={5} stroke="black" /> */}
          <text textAnchor="middle" fontSize="12px" dy="1em">
            {tick.toFixed(2)}
          </text>
        </g>
      ))}
    </svg>
  );
};
