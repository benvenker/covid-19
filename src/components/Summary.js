import React, { useState, useEffect } from "react";
import "./Summary.css";
import axios from "axios";
import { useTable, useSortBy } from "react-table";

const Summary = () => {
  const [countries, setCountries] = useState([]);
  const [column, setColumn] = useState(null);
  const [sort, setSort] = useState({ column: null, direction: "desc" });

  useEffect(() => {
    axios
      .get(`https://api.covid19api.com/summary`)
      .then(response => response.data)
      .then(data => setCountries(data.Countries));
  });

  const columns = [
    {
      Header: "Country",
      accessor: "Country"
    },
    {
      Header: "Total Confirmed",
      accessor: "TotalConfirmed"
    },
    {
      Header: "New Deaths",
      accessor: "NewDeaths"
    },
    {
      Header: "Total Deaths",
      accessor: "Total Deaths"
    },
    {
      Header: "New Recovered",
      accessor: "NewRecovered"
    },
    {
      Header: "Total Recovered",
      accessor: "TotalRecovered"
    }
  ];

  function Table({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable({ columns, data }, useSortBy);

    const handleClick = event => {
      console.log("clicked!");
    };
    // Render Data Table UI
    return (
      <div>
        <h1>Test</h1>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    onClick={() => handleClick()}
                  >
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="summary-container">
      <h1>COVID Outbreak Summary</h1>
      <Table data={countries} columns={columns} />
    </div>
  );
};

export default Summary;
