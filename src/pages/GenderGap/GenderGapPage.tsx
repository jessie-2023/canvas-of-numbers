
import { useState } from "react";
import { WorldMap } from "./WorldMap";
import { TrendBar } from "./TrendBar";
import './GenderGap.scss'
import { Link } from "react-router-dom";

const width = 960;
const height = 500;
const mapShare = 0.75;
const barShare = 0.4;

export default function Home()
{
    const [clickedCountry, setClickedCountry] = useState<number>(352);   
    const [clickedYear, setClickedYear] = useState<number>(2019);
    
    return (<>
    <div className="row">
        <div className="col-md-9 dataviz-title">
            <p>The big picture: How Far Have We Come? Gender Equality Worldwide in {clickedYear} </p>     
        </div>
        <div className="col-md-3 starting-point">
            <p><strong className="hook">Initial Question:</strong> <em>Why women fight?</em></p>
            <p></p>            
        </div>
    </div>
    <div className="row">
        <div className="col-md-9">
            <p className="source">Amazing data from 
                <Link to={"https://www.weforum.org/publications/global-gender-gap-report-2024/global-gender-gap-2024-dashboard/"}>
                    The Global Gender Gap Report
                </Link> 
                published by the World Economic Forum. Interact with the graph by hovering and 
                clicking to see the cross-country gap in each year and time trend in each country.
            </p>       
            <svg 
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ width: '100%', height: 'auto' }}
            >
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
        </div>
        <div className="col-md-3 reasoning-line">
            <p>There is huge variance in gender equality across the world, while observable progress been made</p>
            <ul>
                <li>Political empowerment is the weakest part, only Scanvandian countries have </li>
                <li>Most countries are still struggling with provinding equal economic opportunities</li>
                <li>Half of the countries have equal education condition </li>
                <li>Most countries have equal health condition, even in Yemen, the lowest score </li>
            </ul>
            <p><strong className="hook">Follow up questions:</strong></p>
            <ul>
                <li>How hard women fight in different countries? Are perceptions consistent with this index? Need attitude/opinion survey data</li>
                <li>Are gender equality naturally comes along with economic growth?</li>
                <li>How feminist ideas transmitted across countries?</li>
                <li>What's the role of technology?</li>
            </ul>
        </div>
    </div>
        
            
    </>)
}