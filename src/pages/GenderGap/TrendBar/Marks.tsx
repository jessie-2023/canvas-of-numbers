
export const Marks = ({
  stacked,
  xScale,
  yScale,
  colorScale,
  xValue,
  colorValue,
  innerHeight,
  setClickedYear,
  clickedYear,
}) => {

  const handleYearClick = (i) => {
    setClickedYear(Number(xValue(i))); 
    };
  
    return (
      stacked.map((subIndex) => (
        subIndex.map((s, i) => {
          
          // console.log(`x: ${xValue(i)}, ${clickedYear}`);
          // console.log(`y: ${yScale(yValue(s))}`);
          // console.log(`y: ${yScale(yBotValue(s))}`);
          // console.log(`color: ${colorScale(colorValue(j))}`);
          
          return (
            <rect
              className="mark"
              key={`${xValue(i)}-${colorValue(subIndex)}`}
              x={xScale(xValue(i))}
              y={yScale(s[1])}
              height={innerHeight - yScale(s[1] - s[0])}
              width={xScale.bandwidth()}
              fill={colorScale(colorValue(subIndex))}
              onClick={() => handleYearClick(i)}
              stroke="#688BAB80" //background blue
              stroke-width={clickedYear == xValue(i) ? 2 : 0}
            >
              <title>{`${colorValue(subIndex)}: ${Math.round((s[1] - s[0]) * 400)}%`}</title>
            </rect>
          );
        })
      ))
    );
}
  