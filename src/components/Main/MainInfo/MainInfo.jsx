import styleMainInfo from "./maininfo.module.scss";
import { useEffect, useState } from 'react';
import { useWebSocket } from 'react-use-websocket';
import { MEXC_URL } from "../../utils/consts";
import axios from "axios";

const MainInfo = ({rows}) => {
    // const [kasSymbol, setKasSymbol] = useState('');s
    const [kasPrice, setKasPrice] = useState('');
    const [balance, setBalance] = useState([]);
    const [atProfit, setAtProfit] = useState(0);
  
    const getTokenFromLocalStorage = () => {
        return localStorage.getItem('accessToken');
      };

    const  fetchBalanceProfit = () =>{
        axios.get(`${MEXC_URL}/api/v1/trade/balance-profit`,{
            headers: {
              "Authorization" : `Token ${getTokenFromLocalStorage()}` 
            }
          })
            .then(function (response) {
              // handle success
              console.log(response)
              setAtProfit(response.data.detail.total_profit)
              setBalance(response.data.detail.balance)
            })
            .catch(function (error) {
              // handle error
            })
            .finally(function () {
              // always executed
            })
    }

    useEffect(() => {
      const wsUrl = 'wss://wbs.mexc.com/ws';
      const socket = new WebSocket(wsUrl);
  
      socket.addEventListener('open', (event) => {
        console.log('WebSocket connected');
  
        const subscriptionRequest = {
          method: 'SUBSCRIPTION',
          params: ['spot@public.deals.v3.api@KASUSDT'],
        };
  
        socket.send(JSON.stringify(subscriptionRequest));
      });
  
      socket.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data);
  
          if (
            data &&
            data['s'] &&
            data['d'] &&
            data['d']['deals'] &&
            data['d']['deals'].length > 0 &&
            data['d']['deals'][0]['p']
          ) {
            // setKasSymbol(data['s']);
            setKasPrice(data['d']['deals'][0]['p']);
          }
        } catch (error) {
        //   console.error('Error parsing JSON:', error);
        }
      });
  
      socket.addEventListener('close', (event) => {
        // console.log('WebSocket connection closed');
      });
  
      socket.addEventListener('error', (event) => {
        // console.error('WebSocket error:', event);
      });
  
      return () => {
        // Закрытие соединения при размонтировании компонента
        socket.close();
      };
    }, []);

    useEffect(() => {
        fetchBalanceProfit();
    

          const intervalId = setInterval(() => {
            fetchBalanceProfit();
          }, 30000);
    
          return () => clearInterval(intervalId);

      }, [rows])


    return(
    <div className={styleMainInfo.info}>
        <div className={styleMainInfo.price}>
          {/* <div className={styleMainInfo.icons}>
            <img src="/img/KAS.svg" alt="#" className={styleMainInfo.kas}/>
            <img src="/img/USDT.svg" alt="#" className={styleMainInfo.usdt} />
          </div> */}
          <div className={styleMainInfo.kas__usdt}>
            <p>KAS / USDT</p>
            <p>{kasPrice}</p>
          </div>
        </div>
        <div className={styleMainInfo.balance}>
          <div>Баланс: <span>{balance ? balance.filter((e)=> e.asset == "USDT").map((e)=> e.free.slice(0,5)) : 0} USDT</span></div>
          <div>Total Profit: <span>{atProfit.toFixed(2)} USDT</span></div>
        </div>
    </div>
    )
}

export default MainInfo