import { useState } from "react";
import { WorldMap } from "./WorldMap";

import './HotDocs.scss'
import { Link } from "react-router-dom";


const width = 960;
const height = 520;
const clickedYear = 2019;

export default function HotDocs()
{
    return (<>
        <WorldMap 
            width={width}
            height={height}
            clickedYear={clickedYear}
        />

    </>)
}