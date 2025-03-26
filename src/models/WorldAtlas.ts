import { FeatureCollection, MultiLineString } from "geojson";

export default interface WorldAltas
{
    countries: FeatureCollection;
    interiors: MultiLineString;
}

