import styleLogin from "./login.module.scss"
import React, { useState } from 'react';
import TelegramLoginButton from "react-telegram-login";
import RegistForm from "./RegistForm/RegistForm";
import LoginForm from "./LoginForm/LoginForm";


function Login({setIsLogged, isOpen, setToken}) {
  const [isRegistItems, setIsReigistItems] = useState(true)

    // const handleTelegramResponse = response => {
    //   // Обработка ответа от Телеграма
    //   console.log(response);
    //   setIsLogged(true)
    // };

    return (
    <>
      <div className={styleLogin.login}>   
        <img src="/img/ATHKeeperLogo.png" alt="#" className={styleLogin.logo}/>  
        <div className={`${isRegistItems ? styleLogin['container-login'] : styleLogin['container'] }`}> 
          <div className={styleLogin.head}>
            <div onClick={()=> setIsReigistItems(true)} className={`${styleLogin.button} ${isRegistItems ? styleLogin['login-btn'] : ''}`}  >Вход</div>
            <div onClick={()=> setIsReigistItems(false)} className={`${styleLogin.button} ${isRegistItems ? '' : styleLogin['register-btn']}`} >Регистрация</div>
          </div>
          {
            isRegistItems ? 
            <LoginForm setIsLogged={setIsLogged} setToken={setToken}/>
            :
            <RegistForm/>
          }
        </div>  
      </div>
    </> 
    );
  }
  
  export default Login;