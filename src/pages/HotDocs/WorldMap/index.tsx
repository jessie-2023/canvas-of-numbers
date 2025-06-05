import { useEffect, useState } from 'react';
import { interpolateGnBu as colorGradience } from 'd3';
import { scaleSequential } from 'd3-scale';
import { FeatureCollection } from 'geojson';
import { feature, mesh } from 'topojson';
import { GeometryObject, Topology } from 'topojson-specification';
import { getGenderGaps } from '../../../api/gitGistClient';
import getWorldAtlas from '../../../api/worldAtlasClient';
import Gap from '../../../models/Gap';
import WorldAtlas from '../../../models/WorldAtlas';
import { Marks } from './Marks';
import blueMarbleImage from '../../../assets/blueMarbleMay.jpg';

interface WorldMapProps {
  width: number;
  height: number;
}

export const WorldMap = ({ width, height }: WorldMapProps) => {
  const [world, setWorld] = useState<WorldAtlas>();
  // const [gaps, setGaps] = useState<Gap[]>();

  useEffect(() => {
    getWorldAtlas().then((topology: Topology) => {
      const topoCountries = topology.objects.countries;
      setWorld({
        countries: feature(topology, topoCountries) as FeatureCollection, // transforms TopoJSON country data into a GeoJSON FeatureCollection
        interiors: mesh(topology, topoCountries as GeometryObject, (a, b) => a !== b), // extracts only the shared boundaries (like country borders) from a TopoJSON object
      });
    });
  }, []);

  // useEffect(() => {
  //   getGenderGaps().then((data: Gap[]) => {
  //     // console.log(data.filter(gap => gap.year === clickedYear))
  //     setGaps(data.filter((gap) => gap.year === clickedYear));
  //   });
  // }, [clickedYear]);

  if (!world ) {
    return <p>Loading...</p>;
  }

  const mapByCountry = new Map();
  // gaps.forEach((country) => mapByCountry.set(country.countryId, country));

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
