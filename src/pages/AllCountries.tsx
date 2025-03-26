import { useEffect, useState } from "react";
import Country from "../models/Country";

export default function AllCountries()
{
    const [countries, setCountries] = useState<Country[]>();
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false);

    function loadCountries()
    {
        fetch("http://localhost:5287/countries")
        .then(response => response.json())
        .then(data => setCountries(data))
        .catch(() => setError(true))
        .finally(() => setLoading(false))
    }

    useEffect(loadCountries, [countries])

    return (
        <div>
            <h1>All Countries</h1>
            {countries && countries.map(country =>
                <p>{country.id} - {country.name}</p>
            )}
            {loading && <p>Loading...</p>}
            {error && <p>Error while loading</p>}
        </div>
    )
}