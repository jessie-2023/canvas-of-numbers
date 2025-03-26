
export const ColorLegend = ({
    colorScale,
    tickSpacing,
    tickSize,
    tickTextOffset,
    onHover,
    hoveredValue,
    fadeOpacity,
    xScale
}) => 
    colorScale.domain().map((domainValue, i) =>(
        <g
            className="tick"
            transform={`translate(0,${i * tickSpacing})`}
            onMouseEnter={() => {
                onHover(domainValue);
                console.log(`hoveredValue: ${hoveredValue}`)
              }}
              onMouseOut={() => {
                onHover(null);
              }}
              opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
            >
            <rect fill={colorScale(domainValue)} y={-tickSize / 2} width={xScale.bandwidth()} height={tickSize}/>
            <text x={tickTextOffset} dy=".32em">{domainValue}</text>
        </g>
    ))