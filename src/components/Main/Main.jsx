import styleMain from "./main.module.scss"
import DenseTable from "../Table/Table";
import React, { useRef, useState } from 'react';


const Main = () => {
    const [isButtonDisabled, setButtonDisabled] = useState(true)
    const [isSetting, setIsSetting] = useState(false)
    const [settingBtn, setSettingButtons] = useState(true)
    const [isVisibil, setVisibil] = useState(false)
    const [dataSettings, setDataSetting] = useState({
      order: 7,
      marj: 0.12,
      restart: "Off",
    })

    const orderInputRef = useRef(0);
    const marjInputRef = useRef(0);
    const restartInputRef = useRef(false);
  
  
    const handleTradeButtonClick = () => {
      setButtonDisabled(!isButtonDisabled)
    };
    
    const handleStopButtonClick = () => {

      setButtonDisabled(!isButtonDisabled)
    };

    const handleIsSetting = () =>{
      if(settingBtn){
        setIsSetting(!isSetting)
      }
    }

    const handleSettingBtn = () => {

      const newOrder = orderInputRef.current !== null && orderInputRef.current.value !== '' ? parseFloat(orderInputRef.current.value) : dataSettings.order;
      const newMarj = marjInputRef.current !== null && marjInputRef.current.value !== '' ? parseFloat(marjInputRef.current.value) : dataSettings.marj;

      if (!settingBtn) {
        setDataSetting({
          order: newOrder,
          marj: newMarj,
          restart: isVisibil ? restartInputRef.current.innerText : dataSettings.restart,
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

    return (
      <div className={styleMain.main}>    
        <div className={styleMain.items}> 
            <div className={styleMain.btn}>
              <button  disabled={!isButtonDisabled} onClick={handleTradeButtonClick}>Торговать</button>
              <button onClick={handleIsSetting}>Параметры</button>
              <button disabled={isButtonDisabled} onClick={handleStopButtonClick}>Стоп</button>
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
                  <button onClick={handleSettingBtn}>Изменить</button> 
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
          <DenseTable/>
      </div>
    );
  }
  
export default Main;