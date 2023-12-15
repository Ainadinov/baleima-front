import { useEffect } from "react";
import styleProfile from "./profile.module.scss"
import axios from "axios";

function Profile({token}) {

  useEffect(()=>{
    axios.get('http://185.100.67.120/api/v1/user/profile',{
      headers: {
        "Authorization" : `Token ${token}` 
      }
    })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      })
  }, [])

    return (
      <div className={styleProfile.profile}>
        <div className={styleProfile.user}>
          
        </div>
        <form className={styleProfile.key}>
          <div><span>Api Key</span><input></input></div>
          <div><span>Key Secret</span><input></input></div>         
          <button>Отправить</button>
        </form>
      </div>
    );
  }
  
export default Profile;