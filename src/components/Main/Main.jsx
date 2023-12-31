import styleMain from "./main.module.scss"
import DenseTable from "../Table/Table";
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { MEXC_URL } from "../utils/consts";
import MainInfo from "./MainInfo/MainInfo";




const Main = () => {
    const [isButtonDisabled, setButtonDisabled] = useState('')
    const [isSetting, setIsSetting] = useState(false)
    const [settingBtn, setSettingButtons] = useState(true)
    const [isVisibil, setVisibil] = useState(false)
    const [dataSettings, setDataSetting] = useState({})

    const [rows, setRows] = useState([]);

    const orderInputRef = useRef(0);
    const marjInputRef = useRef(0);
    const restartInputRef = useRef(false);

    const getTokenFromLocalStorage = () => {
      return localStorage.getItem('accessToken');
    };

    const getProfile = () => {
      axios.get(`${MEXC_URL}/api/v1/user/profile`,{
        headers: {
          "Authorization" : `Token ${getTokenFromLocalStorage()}` 
        }
      })
        .then(function (response) {
          setButtonDisabled(response.data.user.auto_trade)
          setDataSetting({order: response.data.user.trade_usdt_quantity, marj: response.data.user.trade_percent})
        })
        .catch(function (error) {
          // handle error
        })
        .finally(function () {
          // always executed
        })
    }

    useEffect(()=>{
      getProfile()

    }, [])


    const handleTradeButtonClick = () => {
      axios.post(`${MEXC_URL}/api/v1/trade/start-trade`, null, {
        headers: {
          "Authorization": `Token ${getTokenFromLocalStorage()}`
        }
      })
        .then(function (response) {
          getProfile()
          alert(response.data.detail)
        })
        .catch(function (error) {
          console.log(error)
          alert(error.response.data.detail)
        });
    };
    
    const handleStopButtonClick = () => {
      axios.post(`${MEXC_URL}/api/v1/trade/stop-trade`, null, {
        headers: {
          "Authorization": `Token ${getTokenFromLocalStorage()}`
        }
      })
        .then(function (response) {
          setButtonDisabled(!isButtonDisabled)
          alert(response.data.detail)
        })
        .catch(function (error) {
        });
    };

    const handleIsSetting = () =>{
      if(settingBtn){
        setIsSetting(!isSetting)
      }
    }

    const handleSettingBtn = () => {

      const newOrder = orderInputRef.current !== null && orderInputRef.current.value !== '' ? parseFloat(orderInputRef.current.value) : dataSettings.order;
      const newMarj = marjInputRef.current !== null && marjInputRef.current.value !== '' ? parseFloat(marjInputRef.current.value) : dataSettings.marj;
      console.log(typeof newMarj)

      const requestData = {
        trade_usdt_quantity: newOrder,
        trade_percent: newMarj,
      };
      
      axios.put(`${MEXC_URL}/api/v1/user/profile`, requestData, {
        headers: {
          'Authorization': `Token ${getTokenFromLocalStorage()}`,
        },
      })
        .then(response => {
          // Обработка успешного ответа
        })
        .catch(error => {
          // Обработка ошибок
        });

      if (!settingBtn) {
        setDataSetting({
          order: newOrder,
          marj: newMarj,
        });
      }
      setVisibil(!isVisibil);
      setSettingButtons(!settingBtn);
    };

    const handleSettingBackBtn = () =>{
      setVisibil(!isVisibil)
      setSettingButtons(!settingBtn)
      setDataSetting(dataSettings)
    }

    const handleSettingChangeBtn = () =>{
      setSettingButtons(!settingBtn)
      setVisibil(!isVisibil);
    }

    return (
    <>
      <MainInfo rows={rows}/>
      <div className={styleMain.main}>    
        <div className={styleMain.items}> 
            <div className={styleMain.btn}>
              <button  disabled={isButtonDisabled} onClick={handleTradeButtonClick}>Торговать</button>
              <button disabled={!isButtonDisabled} onClick={handleStopButtonClick}>Стоп</button>
              <button onClick={handleIsSetting}>Параметры</button>
            </div> 

            { isSetting 
                && 
              <div className={styleMain.settings}>
                <div className={styleMain.setting__items}>
                    <div><span>Сумма ордера: {dataSettings.order} $</span> {isVisibil && <input type="number" ref={orderInputRef} />}</div> 
                    <div><span>Маржа: {dataSettings.marj} %</span> {isVisibil && <input type="number" ref={marjInputRef} />}</div>
                    <div><span>Рестарт: {dataSettings.restart}</span> {isVisibil && <button ref={restartInputRef}>Off</button>}</div>
                </div>
                <div className={styleMain.settings__btn}>
                  {
                  settingBtn ?   
                  <button onClick={handleSettingChangeBtn}>Изменить</button> 
                    :
                    <div>
                      <button onClick={handleSettingBtn}>Сохранить</button>
                      <button onClick={handleSettingBackBtn}>Отмена</button>
                    </div>
                  
                  }
                
                </div>
              </div>  
            }    
        </div>  
          <DenseTable rows={rows} setRows={setRows}/>
      </div>
    </>

    );
  }
  
export default Main;