import styleLogin from "./login.module.scss"
import React from 'react';
import TelegramLoginButton from "react-telegram-login";

function Login({setIsLogged, isOpen}) {

    const handleTelegramResponse = response => {
      // Обработка ответа от Телеграма
      console.log(response);
      setIsLogged(true)
    };

    return (
      <div className={styleLogin.login}>     
        {
        isOpen &&
        <div className={`${styleLogin.container} ${styleLogin.fadeIn}`}> 
          <TelegramLoginButton
            dataOnauth={handleTelegramResponse}
            botName="BaleimaBot"
          />
        </div>  
        }
      </div>
    );
  }
  
  export default Login;