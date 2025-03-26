import Gap from "../models/Gap";
import GapGeneral from "../models/GapGeneral"

export const getGeneralByYear = async (year?: number): Promise<GapGeneral[]> => {
    const response = await fetch(`http://localhost:5287/gender-gap/general/${year}`)
    const data: GapGeneral[] = await response.json();
    return data
}

export const getGapsByCountryId = async (countryId?: number): Promise<Gap[]> => {
    const response = await fetch(`http://localhost:5287/gender-gap/country/${countryId}`)
    const data: Gap[] = await response.json();
    return data
}