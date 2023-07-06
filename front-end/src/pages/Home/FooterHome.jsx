import globo from "../../assets/globo.png";
import "./FooterHome.css";
import wtsp from "../../assets/whatsapp.png";
import phone from "../../assets/calladd.png";
import email from "../../assets/smsstar.png";

export default function FooterHome() {
  return (
    <div id="footerhome">
      <div id="redes">
        <div className="sub-container-footer-home">
          <h2 id="footer_home_contacto">Contactanos</h2>
          <div className="nkjlfsda">
            <img src={wtsp} alt="whatsapp"></img>
            <p>223 594-7824</p>
          </div>
          <div className="nkjlfsda">
            <img src={phone} alt="whatsapp"></img> <p>+54 9 223 594-7824</p>
          </div>
          <div className="nkjlfsda">
            <img src={email} alt="whatsapp"></img>
            <p>email</p>
          </div>
        </div>
        <div className="sub-container-footer-home">
          <p>Licencia</p> <p>Términos y condiciones</p>
        </div>
        <div className="sub-container-footer-home">
          <p>Nosotros</p> <p>Ayuda</p>
        </div>
      </div>
      <div id="endingfooter">
        <p>©2023 Lo de walter</p>
        <div id="idioma">
          <img src={globo} alt="idioma"></img>Español
        </div>
      </div>
    </div>
  );
}
