import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import Country from "../models/Country";
import { useNavigate } from "react-router-dom";
import SelectOption from "../models/SelectOption";


export default function CountrySearch() {
    const [countries, setCountries] = useState<SelectOption[]>();
    const [selectedCountry, setSelectedCountry] = useState<SingleValue<SelectOption>>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5287/countries")
        .then(response => response.json())
        .then(data => setCountries(data.map((country: Country) => (
                {
                    label: country.name,
                    value: country.id,
                }
            ))))
    }, []);

    const handleSelectChange = (select: SingleValue<SelectOption>) =>{
        setSelectedCountry(select);
    };

    const handleSubmit = () => {
        if (selectedCountry) {
            navigate(`/gender-gap/country/${selectedCountry.value}`)
        }
    }

    return (
        <div>
            <h3>Select a Country</h3>
            <Select options={countries} onChange={handleSelectChange} />
            <button onClick={handleSubmit}>Check the gender gap</button>
        </div>
    )
}