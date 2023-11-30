import { Link } from "react-router-dom";
import styleNavbar from "./navbar.module.scss"
import { LOGIN_ROUTE } from "../utils/consts";

function Navbar() {
  const user = false

    return (
      <div className={styleNavbar.navbar}>        
        {user ? <button className={styleNavbar.navbar__message}>Сообщение</button> : <div></div>}

        <div className={styleNavbar.navbar__btn}> 
          {user ? 
                <button>Выйти</button> 
                : 
                <Link to={LOGIN_ROUTE} className={styleNavbar.link}>
                  <button>Логин</button>
                </Link>
          }
          
        </div>
      </div>
    );
  }
  
export default Navbar;