import logo from "../../assets/logowalter.png";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import navbar from "../../assets/navbar.png";
import { Animated } from "react-animated-css";
import { useEffect, useState } from "react";
import logo2 from "../../assets/Capa_1_copia.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/userLogedSlice";

export default function NavBar() {
  const [menu, setMenu] = useState(false);
  const yourUser = useSelector((state) => state.userLoged);
  const route = useLocation();
  const [titulo, setTitulo] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.pathname.split("/")[1] === "producto") {
      setTitulo("Detalles");
    }
  }, [route]);

  return (
    <div id="navbarbox">
      <Link to="/">
        <img src={logo} alt="logo" id="logoImageNavBar"></img>
      </Link>
      <h1 id="titulo_navbar">{titulo}</h1>
      <div className="containernavbar">
        <Link to="/#ubicacion" className="navbaroption">
          ¿Dónde estamos?
        </Link>
        <Link to="/#redes" className="navbaroption">
          Nuestras Redes
        </Link>
        <Link to="/#contacto" className="navbaroption">
          Contacto
        </Link>
      </div>

      {yourUser.loged ? (
        <div className="containernavbar">
          <Link to={"/profile/" + yourUser._id} className="registerbtn">
            Perfil
          </Link>
        </div>
      ) : (
        <div className="containernavbar">
          <Link to="/login" className="ingresarbtn">
            Ingresar
          </Link>
          <Link to="/register" className="registerbtn">
            Registrarme
          </Link>
        </div>
      )}

      <img src={navbar} alt="menu desplegable" id="menu_desplegable" onClick={() => setMenu(!menu)} />
      <div id={menu ? "box_navbar_slide_animation" : "box_navbar_slide_animation_off"}>
        <Animated animationIn="slideInRight" animationOut="slideOutRight" animationInDuration={1000} animationOutDuration={1000} isVisible={menu}>
          <div className={menu ? "navBarSlide" : "navBarSlideOff"}>
            <div id="cerrar_logo">
              <div id="top_bar">
                <img src={logo2} alt="logo" className="logo_navbar_sidemenu"></img>
                <button id="cruz_cerrar" onClick={() => setMenu(!menu)}>
                  X
                </button>
              </div>
            </div>
            <div id="options_navbar">
              <Link to="/#ubicacion" className="navbaroption_drop_menu" onClick={() => setMenu(!menu)}>
                ¿Dónde estamos?
              </Link>
              <Link to="/#redes" className="navbaroption_drop_menu" onClick={() => setMenu(!menu)}>
                Nuestras Redes
              </Link>
              <Link to="/#contacto" className="navbaroption_drop_menu" onClick={() => setMenu(!menu)}>
                Contacto
              </Link>
              {yourUser.loged ? (
                <div id="p">
                  <Link to={"/profile/" + yourUser._id} className="registerbtn" onClick={() => setMenu(!menu)}>
                    Perfil
                  </Link>
                  <button onClick={() => dispatch(logOut())} id="cerrar_sesion_btn">
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div id="p">
                  <Link to="/login" className="navbaroption_drop_menu" onClick={() => setMenu(!menu)}>
                    Ingresar
                  </Link>
                  <Link to="/register" className="navbaroption_drop_menu" onClick={() => setMenu(!menu)}>
                    Registrarme
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Animated>
      </div>
    </div>
  );
}
