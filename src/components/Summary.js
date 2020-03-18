import React, { useState, useEffect } from "react";
import "./Summary.css";
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
          <tr className="header-row">
            <th>Country</th>
            <th>New Confirmed</th>
            <th>Total Confirmed</th>
            <th>New Deaths</th>
            <th>Total Deaths</th>
            <th>New Recovered</th>
            <th>Total Recovered</th>
          </tr>
          <tr>
            <td>All</td>
            <td>
              {Object.values(countries).reduce(
                (total, { NewConfirmed }) => total + NewConfirmed,
                0
              )}
            </td>
            <td>
              {Object.values(countries).reduce(
                (total, { TotalConfirmed }) => total + TotalConfirmed,
                0
              )}
            </td>
            <td>
              {Object.values(countries).reduce(
                (total, { NewDeaths }) => total + NewDeaths,
                0
              )}
            </td>
            <td>
              {Object.values(countries).reduce(
                (total, { TotalDeaths }) => total + TotalDeaths,
                0
              )}
            </td>
            <td>
              {Object.values(countries).reduce(
                (total, { NewRecovered }) => total + NewRecovered,
                0
              )}
            </td>
            <td>
              {Object.values(countries).reduce(
                (total, { TotalRecovered }) => total + TotalRecovered,
                0
              )}
            </td>
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
          <tr>
            <td>All</td>
            <td>
              {Object.values(countries).reduce(
                (total, { NewConfirmed }) => total + NewConfirmed,
                0
              )}
            </td>
            <td>
              {Object.values(countries).reduce(
                (total, { TotalConfirmed }) => total + TotalConfirmed,
                0
              )}
            </td>
            <td>
              {Object.values(countries).reduce(
                (total, { NewDeaths }) => total + NewDeaths,
                0
              )}
            </td>
            <td>
              {Object.values(countries).reduce(
                (total, { TotalDeaths }) => total + TotalDeaths,
                0
              )}
            </td>
            <td>
              {Object.values(countries).reduce(
                (total, { NewRecovered }) => total + NewRecovered,
                0
              )}
            </td>
            <td>
              {Object.values(countries).reduce(
                (total, { TotalRecovered }) => total + TotalRecovered,
                0
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
