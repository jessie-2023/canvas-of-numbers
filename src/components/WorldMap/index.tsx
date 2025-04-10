import { useEffect, useState } from 'react';
import { feature, mesh } from 'topojson';
import { GeometryObject, Topology } from "topojson-specification";
import { FeatureCollection } from "geojson";
import { Marks } from './Marks';
import WorldAtlas from '../../models/WorldAtlas';
import getWorldAtlas from '../../api/worldAtlasClient';
import { scaleSequential } from 'd3-scale';
import { interpolateGnBu as colorGradience, max, min } from 'd3';
import { ColorLegend } from './ColorLegend';
import Gap from '../../models/Gap';
import { getGenderGaps } from '../../api/gitGistClient';


export const WorldMap = ({width, height, clickedCountry, clickedYear, setClickedCountry}) => {
    const [world, setWorld] = useState<WorldAtlas>();
    const [gaps, setGaps] = useState<Gap[]>();
    
    useEffect(() => {
        getWorldAtlas().then((topology: Topology) => {
          const topoCountries = topology.objects.countries;
          setWorld({
            countries: feature(topology, topoCountries) as FeatureCollection, // transforms TopoJSON country data into a GeoJSON FeatureCollection
            interiors: mesh(topology, topoCountries as GeometryObject, (a, b) => a !== b) // extracts only the shared boundaries (like country borders) from a TopoJSON object
        })});
    }, []);

    useEffect(() => {
      getGenderGaps().then((data: Gap[]) => {
        // console.log(data.filter(gap => gap.year === clickedYear))
        setGaps(data.filter(gap => gap.year === clickedYear)) 
    })}, [clickedYear]);


  if (!world || !gaps || !gaps.length) {
    return <p>Loading...</p>;
  }

  const mapByCountry = new Map();
  gaps.forEach(country => mapByCountry.set(country.countryId, country)) 

  const colorValue = (gap: Gap) => gap.generalGap; 
  const colorScale = scaleSequential(colorGradience).domain([ // swap min-max order can reverse the color gradience
    1,
    0.451 // promise min & max are NOT undefined
  ])
  
  return (
    <svg width={width} height={height}>
      <defs>
        <pattern id="gridPattern" patternUnits="userSpaceOnUse" width="3" height="3">
          <path d="M 3 0 L 0 3" fill="none" stroke="#8E8883" stroke-width="0.5" />
        </pattern>
      </defs>
      <Marks 
        world={world} 
        mapByCountry={mapByCountry}
        colorScale={colorScale}
        colorValue={colorValue}
        setClickedCountry={setClickedCountry}
        clickedCountry={clickedCountry}

      />
      <g transform={`translate(${0},${innerHeight - 100}) rotate(-90)`}>
        <ColorLegend colorScale={colorScale} width={200} height={20} />
      </g>
    </svg>
  );
};

