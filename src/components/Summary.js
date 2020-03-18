import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.covid19api.com/summary`)
      .then(response => response.data)
      .then(data => setCountries(data.Countries));
  });

  return (
    <div className="summary-container">
      <h1>COVID Outbreak Summary</h1>
      <table>
        <tbody>
          <tr>
            <th>Country</th>
            <th>New Confirmed</th>
            <th>Total Confirmed</th>
            <th>New Deaths</th>
            <th>Total Deaths</th>
            <th>New Recovered</th>
            <th>Total Recovered</th>
          </tr>
          {countries.map(country => {
            return (
              <tr>
                <td>
                  <a
                    href={`country/${country.Country.toLowerCase()
                      .split(" ")
                      .join("-")}`}
                  >
                    {country.Country}
                  </a>
                </td>
                <td>{country.NewConfirmed}</td>
                <td>{country.TotalConfirmed}</td>
                <td>{country.NewDeaths}</td>
                <td>{country.TotalDeaths}</td>
                <td>{country.NewRecovered}</td>
                <td>{country.TotalRecovered}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
