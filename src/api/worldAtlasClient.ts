import { json } from 'd3';
import { Topology, Objects } from "topojson-specification";
import { GeoJsonProperties } from "geojson";

async function getWorldAtlas(): Promise<Topology<Objects<GeoJsonProperties>>> {
    const mapData = await json(
      'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'
    )

    return mapData as Promise<Topology<Objects<GeoJsonProperties>>>;
}

export default getWorldAtlas