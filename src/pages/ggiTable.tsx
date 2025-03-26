import { useEffect, useState } from "react";
import Country from "../models/Country";
import Gap from "../models/Gap";
import Region from "../models/Region";

export default function GenderGap()
{
    const [gaps, setGaps] = useState<Gap[]>();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true); 


    function loadGaps()
    {
        fetch("http://localhost:5287/gender-gap")
        .then(response => response.json())
        .then(data => {
            console.log(data[0]);
            setGaps(data)})
        .catch(() => setError(true))
        .finally(() => setLoading(false))
    }

    useEffect(loadGaps, [])

    return (
        <div>
            {gaps && (<table className="table">
                <thead>
                    <tr>
                        <th scope="col">Year</th>
                        <th scope="col">Country</th>
                        <th scope="col">Region</th>
                        <th scope="col">General Gap</th>
                        <th scope="col">Health</th>
                        <th scope="col">Education</th>
                        <th scope="col">Economy</th>
                        <th scope="col">Politics</th>
                        <th scope="col">GDPperCap</th>
                        <th scope="col">Population</th>
                    </tr>
                </thead>
                <tbody>
                    {gaps.map(gap => <tr>
                        <th scope="row">{gap.year}</th>
                        <td>{gap.countryName}</td>
                        <td>{gap.regionName}</td>
                        <td>{gap.generalGap}</td>
                        <td>{gap.healthGap}</td>
                        <td>{gap.educationGap}</td>
                        <td>{gap.economicalGap}</td>
                        <td>{gap.politicalGap}</td>
                        <td>{gap.gdpPerCapita}</td>
                        <td>{gap.population}</td>
                    </tr>)}
                </tbody>
            </table>
            )}
            {loading && <p>Loading...</p>}
            {error && <p>Error while loading</p>}
        </div>
    )
}