import React,{useCallback} from "react";
import { debounce } from "../../utils/Index";
import styles from "./FilterInput.css";

/**
 * FilterInput component for input and dropdown filters.
 * @param {Object} props - Component props.
 * @param {Function} props.onInputChange - Handles input change.
 * @param {Function} props.onDropdownChange - Handles dropdown change.
 */
const FilterInput = ({ onInputChange, onDropdownChange }) => {
      // Debounced version of the input change handler
  const debouncedInputChange = useCallback(debounce(onInputChange, 300), [onInputChange]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    debouncedInputChange(value);
  };

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    onDropdownChange(value);
  };

  return (
    <div className={"filterContainer"}>
      <input
        type="text"
        placeholder="Filter by username"
        onChange={handleInputChange}
      />
      <select onChange={handleDropdownChange}>
        <option value="">All Months</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
      </select>
    </div>
  );
};

export default React.memo(FilterInput);
