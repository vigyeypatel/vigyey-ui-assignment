import React from "react";
import TableRow from "../TableRow/TableRow";
import './Table.css'

/**
 * Table component for displaying transaction data.
 * @param {Array} columns - Headers of table
 * @param {Array} data - Transaction data to display.
 */
const Table = ({ columns ,data }) => {
    console.log(data,"Tabledata");
  return (
    <div className="tableContainer">
    <table className={"table"}>
      <thead>
        <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => <TableRow key={item.transactionDate} item={item} columns={columns} />)
        ) : (
          <tr>
            <td colSpan="4">No Data Available</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
};

export default React.memo(Table);
