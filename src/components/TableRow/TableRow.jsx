import React from "react";
import {toCamelCase} from "../../utils/Index"

/**
 * A TableRow component that dynamically renders each row's data based on columns.
 * 
 * @param {Object} item - The data for the current row.
 * @param {Array} columns - The column names to display.
 */
const TableRow = ({ item, columns }) => {
  return (
    <tr>
      {columns.map((column, index) => {
        // Access data dynamically using column name
        const colName = toCamelCase(column);
        const cellData = item[colName];
        return <td key={index}>{cellData}</td>;
      })}
    </tr>
  );
};

export default TableRow;