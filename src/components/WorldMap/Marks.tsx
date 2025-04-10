import { geoNaturalEarth1, geoPath, geoGraticule, geoCentroid } from 'd3';
// import WorldAltas from '../../models/WorldAtlas';
import { useState } from 'react';
import Gap from '../../models/Gap';


const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();
const missingDataColor = 'url(#gridPattern)';


export const Marks = ({ 
  world: { countries, interiors },
  mapByCountry,
  colorScale,
  colorValue,
  setClickedCountry,
  clickedCountry
}) =>  {
  const [hoveredCountry, setHoveredCountry] = useState<{ name: string; x: number; y: number } | null>(null);

  const handleCountryClick = (country: Gap) => {
    setClickedCountry(country.countryId); 
  };
  
  const clickedFeature = countries.features.find(feature => clickedCountry == feature.id)

  // console.log("Hovered country:", hoveredCountry);

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
                onClick={() => handleCountryClick(country)}
                onMouseEnter={() =>
                  setHoveredCountry({ name: feature.properties.name, x: centroid[0], y: centroid[1] })
                }
                onMouseLeave={() => setHoveredCountry(null)}
              />)
          })}
          <path className="interiors" d={path(interiors) as string} />        
          <path className="clickedCountry" 
                fill='none'
                stroke='#BA5F06'
                strokeWidth={2}
                d={path(clickedFeature) as string} 
          />

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

