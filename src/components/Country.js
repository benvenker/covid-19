import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = props => {
  console.log("Country props", props);
  const [country, setCountry] = useState("");
  const [confirmed, setConfirmed] = useState([]);
  const [recovered, setRecovered] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const slug = props.match.params.slug;

  const newConfirmed = confirmed;
  console.log("newConfirmed ", newConfirmed);

  newConfirmed.map(el => console.log("Date! ", el["Date"]));
  // Get Confirmed Cases
  useEffect(() => {
    axios
      .get(`https://api.covid19api.com/dayone/country/${slug}/status/confirmed`)
      .then(response => response.data)
      .then(data => setConfirmed(data));
  }, []);

  // Get Recovered Cases
  useEffect(() => {
    axios
      .get(`https://api.covid19api.com/dayone/country/${slug}/status/recovered`)
      .then(response => response.data)
      .then(data => setRecovered([data]));
  }, []);

  // Get Deaths
  useEffect(() => {
    axios
      .get(`https://api.covid19api.com/dayone/country/${slug}/status/deaths`)
      .then(response => response.data)
      .then(data => setDeaths([data]));
  }, []);

  return (
    <div className="country-container">
      <h1>{slug.split("-").join(" ")}</h1>
      <h2>Confirmed</h2>
      <section>
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Cases</th>
            </tr>
            {confirmed.map(confirm => {
              return (
                <tr>
                  <td>{confirm.Date}</td>
                  <td>{confirm.Cases}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Country;
