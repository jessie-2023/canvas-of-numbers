import { useEffect, useState } from 'react';
import { FeatureCollection } from 'geojson';
import { feature, mesh } from 'topojson';
import { GeometryObject, Topology } from 'topojson-specification';
import getWorldAtlas from '../../../api/worldAtlasClient';
import WorldAtlas from '../../../models/WorldAtlas';
import { Marks } from './Marks';
import blueMarbleImage from '../../../assets/blueMarbleMay.jpg';

interface WorldMapProps {
  width: number;
  height: number;
}

export const WorldMap = ({ width, height }: WorldMapProps) => {
  const [world, setWorld] = useState<WorldAtlas>();

  useEffect(() => {
    getWorldAtlas().then((topology: Topology) => {
      const topoCountries = topology.objects.countries;
      setWorld({
        countries: feature(topology, topoCountries) as FeatureCollection, // transforms TopoJSON country data into a GeoJSON FeatureCollection
        interiors: mesh(topology, topoCountries as GeometryObject, (a, b) => a !== b), // extracts only the shared boundaries (like country borders) from a TopoJSON object
      });
    });
  }, []);

  if (!world ) {
    return <p>Loading...</p>;
  }

  const mapByCountry = new Map();

  return (
    <svg width={width} height={height}>
      {/* Background Image Layer */}
      <image
        href={blueMarbleImage}
        x={0}
        y={0}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid slice" 
      />
      {/* D3 vector marks overlay */}
      <Marks
        world={world}
        mapByCountry={mapByCountry}
      />
    </svg>
  );
};
