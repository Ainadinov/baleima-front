import axios from "axios";
import styleRegistForm from "./registForm.module.scss"
import React, { useState } from 'react';

const RegistForm = () => {
  const [username, setUsername] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');


  // const handleRegister = () => {
  //   // const url = "be2c-2-135-137-238.ngrok-free.app/registration";
  //   const bodyFitch = {username: "User", password: "123456"}

  //   // fetch ("https://be2c-2-135-137-238.ngrok-free.app/api/v1/user/registration", {
  //   //   method: 'POST',
  //   //   body: JSON.stringify(bodyFitch),
  //   //   headers: {
  //   //     'Content-Type': 'application/json'
  //   //     }
  //   //   })
  //   //     .then((response) => {
  //   //       console.log(response);
  //   //       return response.json();
  //   //     })
  //   //     .then(data => console.log(data))
  //   //     .catch(error => console.log('Error:', error));

  //   axios.post('https://39f7-2-135-137-238.ngrok-free.app/api/v1/registration', {
  //     username: 'nurlan',
  //     password: 'qwerty123456'
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //   };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !login || !password || !passwordConfirmation) {
      alert("Пожалуйста, заполните все поля формы.");
      return;
    }

    if (password !== passwordConfirmation) {
      alert("Пароли не совпадают");
      return;
    }

  };

  return (
  <>

    <form onSubmit={handleRegister} className={styleRegistForm.form}>
      <span>Имя:</span>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Имя" />

      <span>Логин:</span>
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин" />

      <span>Пароль:</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <span>Повторите пароль:</span>
        <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>

      <button type="submit">Регистрация</button>
    </form>

  </>
  );
};

export default RegistForm;
