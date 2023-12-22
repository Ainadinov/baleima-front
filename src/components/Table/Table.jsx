import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styleTable from "./table.module.scss"
import { MEXC_URL } from '../utils/consts';

const DenseTable = ({rows, setRows}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Установите желаемый размер страницы

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken');
  };

  const formatDateTime = (dateTimeString) => {
    const dateObject = new Date(dateTimeString);

    const year = dateObject.getFullYear().toString().slice(-2);
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  const fetchData = () => {
    axios.get(`${MEXC_URL}/api/v1/trade/trade-info?page=${currentPage}&page_size=${pageSize}`,{
      headers: {
        "Authorization" : `Token ${getTokenFromLocalStorage()}` 
      }
    })
      .then(function (response) {
        // handle success
        setRows(response.data.results.detail)
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      })
  };

  useEffect(() => {
    fetchData();

    if (currentPage === 1) {
      const intervalId = setInterval(() => {
        fetchData();
      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, [currentPage])

  return (
    <div>
      <table className={styleTable.table}>
        <thead>
          <tr className={styleTable.myorders}>
            <th colSpan="5">My orders</th>
          </tr>
          <tr>
            <th>KAS</th>
            <th>Buy</th>
            <th>Sell</th>
            <th>Profit</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.buy_kaspa_quantity}</td>
              <td>{row.buy_price}</td>
              <td>{row.sell_price}</td>
              <td>{row.profit}</td>
              <td>{formatDateTime(row.date_time)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styleTable.btns}>
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Предыдущая страница
        </button>
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={rows.length < pageSize}
        >
          Следующая страница
        </button>
      </div>
    </div>
  );
};

export default DenseTable;
