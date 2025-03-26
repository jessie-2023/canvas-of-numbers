import { useEffect, useState } from "react";
import Country from "../models/Country";
import Gap from "../models/Gap";
import Region from "../models/Region";
import { WorldMap } from "../components/WorldMap/index";
import { TrendBar } from "../components/TrendBar";

const width = 960;
const height = 500;
const mapShare = 0.75;
const barShare = 0.4;

export default function Home()
{
    const [clickedCountry, setClickedCountry] = useState<number>(352);   
    const [clickedYear, setClickedYear] = useState<number>(2019);
    
    return (<>
    <h2 className="title">Gender Equality Worldwide in {clickedYear}: How Far Have We Come?</h2>
        <svg width={width} height={height}>
            <g transform={`scale(${mapShare}) translate(${(1 - mapShare) * width / 2 - 80}, 0)`}>
                <WorldMap 
                    width={width}
                    height={height}
                    setClickedCountry={setClickedCountry}
                    clickedCountry={clickedCountry}
                    clickedYear={clickedYear}
                />
            </g>
            <g transform={`translate(-80, ${height - barShare * height})`}>
                <TrendBar 
                    width={width}
                    height={barShare * height}
                    setClickedYear={setClickedYear}
                    clickedYear={clickedYear}
                    clickedCountry={clickedCountry}
                />
            </g>
        </svg>
            
    </>)
}