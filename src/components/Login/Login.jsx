import styleLogin from "./login.module.scss"
import React from 'react';
import TelegramLoginButton from "react-telegram-login";

function Login() {

    const handleTelegramResponse = response => {
      // Обработка ответа от Телеграма
      console.log(response);
    };

    return (
      <div className={styleLogin.login}>     

        {/* <div className={styleLogin.container}> 
          <button >Войти с помощью ???</button>
        </div> */}

        <TelegramLoginButton
          dataOnauth={handleTelegramResponse}
          botName="BaleimaBot"
        />
        
      </div>
    );
  }
  
  export default Login;