import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth.context";
import { logout } from "../api/auth";

import "../scss/Header.scss";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);
  return (
    <header className="header">
      <h1 className="h1-container">Ingrese El Titulo</h1>
      <nav>
        <ul className="nav-links">
          {isAuthenticated ? (
            <>
              <li>
                <button
                  onClick={() => {
                    logout();
                    //navigate("/fuiweucbkalksebvañosefnuaibeowuebfibepf",{state:{ruta:"/"}});
                    navigate("/login")
                    
                  }}
                >
                  Cerrar Sesion
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="link">
                  Registro
                </Link>
              </li>
              <li>
                <Link to="/login" className="link">
                  Inicio de Sesion
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
