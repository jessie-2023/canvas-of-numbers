// import WorldAltas from '../../models/WorldAtlas';
import { useState } from 'react';
import { geoPath, geoCentroid, geoEquirectangular} from 'd3';

const width = 1080;
const height = 540;

const projection = geoEquirectangular()
  .scale(width / (2 * Math.PI)) // this ensures the projection width ≈ image width
  .translate([width / 2, height / 2]); // centers the globe in the SVG
const path = geoPath(projection);

export const Marks = ({
  world: { countries, interiors },
  mapByCountry,
}) => {
  const [hoveredCountry, setHoveredCountry] = useState<{
    name: string;
    x: number;
    y: number;
  } | null>(null);

  return (
    <g className="marks">
      <path className="sphere" d={path({ type: 'Sphere' }) as string} />
      {countries.features.map((feature) => {
        const country = mapByCountry.get(Number(feature.id));
        const centroid = projection(geoCentroid(feature));
        return (
          <path
            className="land"
            d={path(feature) as string}
            onMouseEnter={() =>
              setHoveredCountry({ name: feature.properties.name, x: centroid[0], y: centroid[1] })
            }
            onMouseLeave={() => setHoveredCountry(null)}
          />
        );
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
    </g>
  );
};
