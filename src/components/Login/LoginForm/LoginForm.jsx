import styleLoginForm from "./loginForm.module.scss"
import React, { useState } from 'react';

const LoginForm = ({  }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin =  (e) => {
    e.preventDefault();

    if (!login || !password) {
      alert("Пожалуйста, введите логин и пароль.");
      return;
    }
    
  };

  return (
    <form onSubmit={handleLogin} className={styleLoginForm.form}>
      <span>Логин:</span>
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин" />

      <span>Пароль:</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit">Вход</button>
    </form>
  );
};

export default LoginForm;
