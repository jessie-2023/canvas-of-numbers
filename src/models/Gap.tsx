export default interface Gap
{
    id: number;
    countryId: number; // Foreign Key
    countryName: string; // Navigation Property
    regionId: number;
    regionName: string; // Navigation Property
    year: number;
    generalGap: number;
    healthGap: number;
    educationGap: number;
    economicalGap: number;
    politicalGap: number;
    gdpPerCapita: number;
    population: number;

}