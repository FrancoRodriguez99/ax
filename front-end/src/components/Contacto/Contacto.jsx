import mdq from "../../assets/mdq.png";
import gps from "../../assets/gps.png";
import "./Contacto.css";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

export default function Contacto() {
  const [contacto, setContacto] = useState({ name: "", msg: "", contactData: "" });

  const createNotification = (type) => {
    switch (type) {
      case "success":
        NotificationManager.success("Te contactaremos en la brevedad.", "¡Mensaje enviado!");
        break;
      case "error":
        NotificationManager.error("¡Asegurate de que todos los campos estén completos!", "¡Error Enviando el Mensaje!", 5000);
        break;
      default:
        break;
    }
  };

  function sendMSG() {
    fetch("https://backend.lodewalter.com.ar/api/mensajeria/contacto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contacto),
    })
      .then((answer) => answer.json())
      .then((answerjs) => {
        if (answerjs.message === "ok") {
          setContacto({ name: "", msg: "", contactData: "" });
          createNotification("success");
        } else createNotification("error");
      });
  }

  return (
    <div>
      <div id="contacto-box">
        <div id="contacto">
          <h2 id="contacto_title">Contacto</h2>
          <div id="contactogps_title">
            <h3 id="ubicacion_titulo">Encontranos </h3> <img src={gps} alt="gps"></img>
          </div>
          <p id="ubicacion">Estamos en Juramento y Ayolas, Mar Del plata</p>
          <div id="contactanosdatabox">
            <iframe
              title="Mapa_Direccion"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.4028169823187!2d-57.5567852!3d-38.0376994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584de79051399bd%3A0x6f9f1151d998e8f6!2sAyolas%20%26%20Juramento%2C%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1681838000322!5m2!1sen!2sar"
              width="407px"
              height="407px"
              className="mapa_contacto"
              style={{ border: 0, borderRadius: 20 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <div id="formulariodata">
              <div>
                <p className="formulariocontactolabels">Nombre y apellido</p> <input className="inputoneliner" onChange={(e) => setContacto({ ...contacto, name: e.target.value })} value={contacto.name}></input>
              </div>
              <div>
                <p className="formulariocontactolabels">Teléfono o Email</p>
                <input className="inputoneliner" onChange={(e) => setContacto({ ...contacto, contactData: e.target.value })} value={contacto.contactData}></input>
              </div>
              <div>
                <p className="formulariocontactolabels">Mensaje</p>
                <textarea className="inputtextarea" onChange={(e) => setContacto({ ...contacto, msg: e.target.value })} value={contacto.msg}></textarea>
              </div>
            </div>
          </div>
          <button id="enviarcontacto" onClick={() => sendMSG()}>
            Enviar
          </button>

          <iframe
            title="Mapa_Direccion"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.4028169823187!2d-57.5567852!3d-38.0376994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584de79051399bd%3A0x6f9f1151d998e8f6!2sAyolas%20%26%20Juramento%2C%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1681838000322!5m2!1sen!2sar"
            width="300px"
            height="150px"
            className="mapa_contacto_phone"
            style={{ border: 0, borderRadius: 20 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <img src={mdq} alt="Mar Del Plata" id="contactofondo"></img>
      </div>
    </div>
  );
}
