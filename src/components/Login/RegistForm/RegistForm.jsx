import axios from "axios";
import styleRegistForm from "./registForm.module.scss";
import React, { useState } from 'react';

const RegistForm = () => {
  const [username, setUsername] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !login || !password || !passwordConfirmation) {
      setFormError(true);
      setUsernameError(!username);
      setLoginError(!login);
      setPasswordError(!password);
      setPasswordConfirmationError(!passwordConfirmation);
      return;
    }

    if (password !== passwordConfirmation) {
      setFormError(true);
      setPasswordError(true);
      setPasswordConfirmationError(true);
      return;
    }

    axios.post('https://admin.athkeeper.com/api/v1/user/registration', {
      first_name: username,
      username: login,
      phone_number: " ",
      password: password,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    setFormError(false);
  };

  return (
    <>
      <form onSubmit={handleRegister} className={styleRegistForm.form}>
        {formError && <p className={styleRegistForm.errorMessage}>Заполните все поля формы и убедитесь, что пароли совпадают.</p>}

        <span>Имя:</span>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameError(false);
            setFormError(false);
          }}
          placeholder="Имя"
          className={usernameError ? styleRegistForm.error : ''}
        />

        <span>Логин:</span>
        <input
          type="text"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
            setLoginError(false);
            setFormError(false);
          }}
          placeholder="Логин"
          className={loginError ? styleRegistForm.error : ''}
        />

        <span>Пароль:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
            setFormError(false);
          }}
          className={passwordError ? styleRegistForm.error : ''}
        />

        <span>Повторите пароль:</span>
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => {
            setPasswordConfirmation(e.target.value);
            setPasswordConfirmationError(false);
            setFormError(false);
          }}
          className={passwordConfirmationError ? styleRegistForm.error : ''}
        />

        <button type="submit">Регистрация</button>
      </form>
    </>
  );
};

export default RegistForm;
