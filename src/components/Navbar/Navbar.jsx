import { Link} from "react-router-dom";
import styleNavbar from "./navbar.module.scss"
import { CgProfile } from "react-icons/cg";

function Navbar({isLogged, setIsLogged, setIsMessageOpen, }) {
    const handleLogout = () => {
      // Дополнительная логика выхода, например, сброс статуса авторизации
      setIsLogged(false);
    }

    return (
      <div className={styleNavbar.navbar}>     
        {isLogged ? 
          <div className={styleNavbar.navbar__items}>
              <Link to="/main">
                <img src="/img/ATHKeeperLogo.png" alt="ATHKeeper" />
              </Link>
              <Link to="/profile">
                  <CgProfile className={styleNavbar.profile}/>
              </Link>
          </div> : <div></div>}        
        <div className={styleNavbar.navbar__btn}> 
          <button className={styleNavbar.navbar__message} onClick={()=> setIsMessageOpen(true)}>Сообщение</button>
          {isLogged && <button onClick={handleLogout}>Выйти</button>}
          
        </div>
      </div>
    );
  }
  
export default Navbar;