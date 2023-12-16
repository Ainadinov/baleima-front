import { useEffect, useState } from "react";
import styleProfile from "./profile.module.scss"
import axios from "axios";

function Profile() {
  const [user, setUser] = useState('')
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('accessToken');
  };

  useEffect(()=>{
    
    axios.get('https://athkeeper.com/api/v1/user/profile',{
      headers: {
        "Authorization" : `Token ${getTokenFromLocalStorage()}` 
      }
    })
      .then(function (response) {
        // handle success
        console.log(response.data.user);
        setUser(response.data.user)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      })
  }, [])

  const sendMexcKeys = (event) =>{
    event.preventDefault();

    axios.put('https://athkeeper.com/api/v1/user/profile', { mexc_api_key: apiKey, mexc_secret_key: secretKey }, {
        headers: {
          'Authorization': `Token ${getTokenFromLocalStorage()}`,
          'Content-Type': 'application/json', 
        },
      })
        .then(response => {
          console.log('Success:', response.data);
          setApiKey("")
          setSecretKey("")
        })
        .catch(error => {
          console.error('Error:', error);
          // Обработка ошибок
        });
  }
  /// Exist

    return (
      <div className={styleProfile.profile}>
        <div className={styleProfile.user}>
          <div className={styleProfile.info}>My info</div>
          <div><span className={styleProfile.first_child}>Имя:</span> <span className={styleProfile.second_child}>{user.first_name}</span></div>
          <div><span className={styleProfile.first_child}>Логин:</span> <span className={styleProfile.second_child}>{user.username}</span></div>
          <div><span className={styleProfile.first_child}>Почта:</span> <span className={styleProfile.second_child}>{user.email}</span></div>
          <div><span className={styleProfile.first_child}>Сумма ордера:</span> <span className={styleProfile.second_child}>{user.trade_percent} %</span></div>
          <div><span className={styleProfile.first_child}>Маржа:</span> <span className={styleProfile.second_child}>{user.trade_usdt_quantity} $</span></div>
        </div>

      <form className={styleProfile.key} onSubmit={sendMexcKeys}>
        <div>
          <span>Mexc Api Key</span>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <div>
          <span>Mexc Secret Key</span>
          <input
            type="text"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
        </div>
        <button type="submit">Отправить</button>
      </form>
      </div>
    );
  }
  
export default Profile;