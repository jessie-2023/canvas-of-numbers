import { csv } from 'd3';
import Gap from '../models/Gap';

export const getGenderGaps = async (): Promise<Array<Gap>> => {
  const url =
    'https://gist.githubusercontent.com/jxevergrow/cea5bdaa70fbadbd7eb4a2cb46165f8e/raw/GlobalGenderGap.csv';
  const data = await csv(url, (d) => ({
    year: +d.year,
    regionName: d.regionName,
    generalGap: +d.generalGap,
    healthGap: +d.healthGap,
    educationGap: +d.educationGap,
    economicalGap: +d.economicalGap,
    politicalGap: +d.politicalGap,
    gdpPerCapita: +d.gdpPerCapita,
    population: +d.population,
    countryName: d.countryName,
    countryId: +d.countryId,
  }));
  // console.log("loaded data:", data)
  return (data as Array<Gap>).sort((a, b) => a.year - b.year);
};
