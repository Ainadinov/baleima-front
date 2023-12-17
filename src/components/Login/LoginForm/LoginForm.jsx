import axios from "axios";
import styleLoginForm from "./loginForm.module.scss";
import React, { useState } from 'react';


const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('accessToken', token);
};


const LoginForm = ({ setIsLogged, setToken }) => {
  const [islogin, setLogin] = useState('');
  const [ispassword, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState('');
  const [allError, setAllError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!islogin || !ispassword) {
      setLoginError(!islogin);
      setPasswordError(!ispassword);
      return;
    }

    axios.post('https://admin.athkeeper.com/api/v1/user/api-token-auth', {
      username: islogin,
      password: ispassword
    })
      .then(function (response) {
        // Сохранение токена в LocalStorage
        saveTokenToLocalStorage(response.data.token);

        setIsLogged(true);
      })
      .catch(function (error) {
        // Обработка ошибок
        console.log(error.response.data);
        setError('Неверный логин или пароль');
        setAllError(true);
      });
  };

  return (
    <form onSubmit={handleLogin} className={styleLoginForm.form}>
      <p className={styleLoginForm.errorMessage}>
        {loginError || passwordError ? "Пожалуйста, введите логин и пароль." : ""}
      </p>
      {error && <p className={styleLoginForm.errorMessage}>{error}</p>}

      <span>Логин:</span>
      <input
        type="text"
        value={islogin}
        onChange={(e) => {
          setLogin(e.target.value);
          setLoginError(false);
          setError('');
          setAllError(false);
        }}
        placeholder="Логин"
        className={loginError || allError ? styleLoginForm.error : ''}
      />

      <span>Пароль:</span>
      <input
        type="password"
        value={ispassword}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError(false);
          setError('');
          setAllError(false);
        }}
        className={passwordError || allError ? styleLoginForm.error : ''}
      />

      <button type="submit">Вход</button>
    </form>
  );
};

export default LoginForm;
