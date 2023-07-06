import FooterHome from "./FooterHome";
import Contacto from "../../components/Contacto/Contacto";
import "./Home.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BannerProduct from "../../components/BannerProduct/BannerProduct";

export default function Home() {
  const location = useLocation();
  const itsloged = useSelector((state) => state.userLoged.loged);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  useEffect(() => {
    fetch("https://backend.lodewalter.com.ar/api/products/getProducts", { method: "GET" })
      .then((x) => x.json())
      .then((d) => setData(d));
  }, []);

  return (
    <div id="home_parent">
      <div>
        <p id="hometitle">
          Disfruta de la mejor comida <span className="colored-word">casera</span>
        </p>

        <p className="subtitlehome">a un click</p>
      </div>
      <div id="pedirbox">
        <p id="pedirboxtitle">Lo mejor de Mar del Plata</p>
        {itsloged ? null : <button id="pedirboxbtn">Pedir ahora</button>}
        <div id="container_cajas_imagenes">
          {data.map((x) => (
            <BannerProduct data={x} key={x._id} />
          ))}
        </div>
      </div>
      <Contacto />
      <FooterHome />
    </div>
  );
}
