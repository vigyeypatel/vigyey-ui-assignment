import React, { useEffect, useState } from "react";
import FilterInput from "./components/FilterInput/FilterInput";
import Table from "./components/Table/Table";
import {calculateRewardPoints, calculateMonthlyRewards} from './utils/Index'
import axios from 'axios';
import styles from "./App.css";
import "./index.css";
  
import {TRANSACTIONS_HEADERS } from './utils/constants'

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [monthlyRewards, setMonthlyRewards] = useState({});
  const [filterText, setFilterText] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  console.log(monthlyRewards,"monthlyRewards");
  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3300/transactions");
        console.log(response);
        const dataWithRewards = response.data.map((item) => ({
          ...item,
          rewardPoints: calculateRewardPoints(item.transactionAmount),
        }));
        setTransactions(dataWithRewards);
        setFilteredData(dataWithRewards);
        // Calculate monthly reward points
        const rewards = calculateMonthlyRewards(response.data);
        
        setMonthlyRewards(rewards);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  // Handle filtering
  useEffect(() => {
    let updatedData = transactions;

    if (filterText) {
      updatedData = updatedData.filter((item) =>
        item.userName.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (filterMonth) {
      updatedData = updatedData.filter((item) =>
        new Date(item.transactionDate).toLocaleString("default", { month: "long" }) === filterMonth
      );
    }

    setFilteredData(updatedData);
  }, [filterText, filterMonth, transactions]);


  return (
    <div className={"container"}>
      <h1 className={'header'}>Transactions Dashboard</h1>

      <FilterInput
        onInputChange={(text) => setFilterText(text)}
        onDropdownChange={(month) => setFilterMonth(month)}
      />

      
      <ul className={"rewardsList"}>
        {Object.values(monthlyRewards).map((reward) => {
          const user = transactions.find((t) => t.customerId === reward.customerId);
          return (
            <li key={`${reward.customerId}-${reward.month}`}>
              {user?.userName} ({reward.month}): {reward.points} points
            </li>
          );
        })}
      </ul>

      <h2>Monthly Transactions</h2>
      <div className={"tableWrapper"}>
        <Table columns={TRANSACTIONS_HEADERS} data={filteredData} />
      </div>
    </div>
  );
};

export default App;
