import { Link} from "react-router-dom";
import styleNavbar from "./navbar.module.scss"
import { CgProfile } from "react-icons/cg";

function Navbar({isLogged, setIsLogged, setIsMessageOpen, }) {
    const handleLogout = () => {
      // Дополнительная логика выхода, например, сброс статуса авторизации
      setIsLogged(false);

      localStorage.removeItem('accessToken');
    }

    return (
      <div className={styleNavbar.navbar}>     
        {isLogged && 
          <Link to="/main">
            <img src="/img/ATHKeeperLogo.png" alt="ATHKeeper" />
          </Link>
        }        
          
        {isLogged && 
          <div className={styleNavbar.navbar__items}>
            {/* <button className={styleNavbar.navbar__message} onClick={()=> setIsMessageOpen(true)}>Сообщение</button> */}
            <button onClick={handleLogout}>Выйти</button>
            <Link to="/profile">
                <CgProfile className={styleNavbar.profile}/>
            </Link>
          </div> 
        }

      </div>
    );
  }
  
export default Navbar;