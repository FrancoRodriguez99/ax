import logo from "../../assets/Capa_1_copia.png";
import "./Banner.css";
import rectangles from "../../assets/rectangles.png";

export default function Banner() {
  return (
    <div id="banner">
      <div>
        <img src={rectangles} alt="banner rectangulo" id="bannerrectangulo"></img>
      </div>
      <img src={logo} alt="logo" id="bannerlogo"></img>
    </div>
  );
}
