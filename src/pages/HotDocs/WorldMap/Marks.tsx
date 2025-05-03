import { geoNaturalEarth1, geoPath, geoGraticule, geoCentroid } from 'd3';
// import WorldAltas from '../../models/WorldAtlas';
import { useState } from 'react';



const projection = geoNaturalEarth1()
  .scale(960 / (2 * Math.PI) * 1.2) // this ensures the projection width ≈ image width
  .translate([960 / 2, 520 / 2]); // centers the globe in the SVG
const path = geoPath(projection);
const graticule = geoGraticule();
const missingDataColor = 'url(#gridPattern)';


export const Marks = ({ 
  world: { countries, interiors },
  mapByCountry,
  colorScale,
  colorValue,

}) =>  {
  const [hoveredCountry, setHoveredCountry] = useState<{ name: string; x: number; y: number } | null>(null);


  return (<g className="marks">
    
          <path className="sphere" d={path({ type: 'Sphere' }) as string} />
          <path className="graticules" d={path(graticule()) as string} />
          {countries.features.map(feature => {
            // console.log(feature)
            const country = mapByCountry.get(Number(feature.id));
            const centroid = projection(geoCentroid(feature));
            // console.log(colorScale(colorValue(country)));

            return (
              <path className="land" 
                fill={country ? colorScale(colorValue(country)) : missingDataColor}
                d={path(feature) as string} 
                onMouseEnter={() =>
                  setHoveredCountry({ name: feature.properties.name, x: centroid[0], y: centroid[1] })
                }
                onMouseLeave={() => setHoveredCountry(null)}
              />)
          })}
          <path className="interiors" d={path(interiors) as string} />        
          {hoveredCountry && (
            <text
              className="country-label"
              x={hoveredCountry.x}
              y={hoveredCountry.y}
              textAnchor="middle"
            >
              {hoveredCountry.name}
            </text>
          )}
          
  </g>);
}

