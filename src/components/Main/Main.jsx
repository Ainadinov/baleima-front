import styleMain from "./main.module.scss"
import React, { useState } from 'react';


const Main = () => {
    const [tradeValue, setTradeValue] = useState();
    const [kasValue, setKasValue] = useState(0);
    const [isButtonDisabled, setButtonDisabled] = useState(true)
  
    const handleTradeChange = (e) => {
      const inputValue = parseFloat(e.target.value);
      // Проверка на диапазон от 0.00 до 10.00
      if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 10) {
        setTradeValue(inputValue);
      }
    };

    const handleKasChange = (e) => {
      setKasValue(e.target.value)
    }
  
    const handleTradeButtonClick = () => {
      // Здесь можно выполнить необходимую логику для обработки значения
      console.log('Торг с числом:', tradeValue);
      console.log('Сумма KAS:', kasValue);

      const userBalance =  getBalance() //getBalance();

      // Проверка, что сумма KAS не превышает баланс пользователя
      if (kasValue <= userBalance) {
        console.log('Торг успешно выполнен!');
        setButtonDisabled(!isButtonDisabled)
      } else {
        console.log('Недостаточно средств для торговли.');
      }
    };

    const getBalance = () => {

      return 1000;
    };
    
    const handleStopButtonClick = () => {

      setButtonDisabled(!isButtonDisabled)
    };

    return (
      <div className={styleMain.main}>     
            <div className={styleMain.torg}>
              <span> Введите сумму: </span>
              <input
                type="number"
                step="1"
                min="0"
                max="1000"
                value={kasValue}
                onChange={handleKasChange}
              />
            </div>
            <div className={styleMain.torg}>
              <span> Цена продажи: </span>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={tradeValue}
                onChange={handleTradeChange}
              />
            </div>
            <button  disabled={!isButtonDisabled} onClick={handleTradeButtonClick}>Торговать</button>
            <button disabled={isButtonDisabled} onClick={handleStopButtonClick}>Стоп</button>
    </div>
    );
  }
  
export default Main;