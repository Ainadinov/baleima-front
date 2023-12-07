import { Link } from "react-router-dom";
import styleNavbar from "./navbar.module.scss"
import { LOGIN_ROUTE } from "../utils/consts";
import { CgProfile } from "react-icons/cg";

function Navbar({isLogged, setIsLogged, setIsOpen, setIsMessageOpen, set}) {
    const handleLogout = () => {
      // Дополнительная логика выхода, например, сброс статуса авторизации
      setIsLogged(false);
    }

    return (
      <div className={styleNavbar.navbar}>     
        {isLogged ? 
          <div className={styleNavbar.navbar__items}>
              <button className={styleNavbar.navbar__message} onClick={()=> setIsMessageOpen(true)}>Сообщение</button>
              <CgProfile className={styleNavbar.profile} onClick={()=>set(false)}/>
          </div> : <div></div>}        
        <div className={styleNavbar.navbar__btn}> 
          {isLogged ? 
                <button onClick={handleLogout}>Выйти</button> 
                : 
                <Link to={LOGIN_ROUTE} className={styleNavbar.link}>
                  <button onClick={()=> setIsOpen(true)}>Логин</button>
                </Link>
          }
          
        </div>
      </div>
    );
  }
  
export default Navbar;