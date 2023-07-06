import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/userLogedSlice";
import FooterHome from "../Home/FooterHome";
import "./Profile.css";
import editar from "../../assets/editar.png";
import guardar from "../../assets/guardar.svg";
import { cloudinary } from "../../hooks/cloudinary";
import { useState } from "react";
import loading from "../../assets/loading.gif";
import { NotificationManager } from "react-notifications";
import Ordenes from "../../components/Ordenes/Ordenes";
import Direcciones from "../../components/Direcciones/Direcciones";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Profile() {
  const dispatch = useDispatch();

  const userLoged = useSelector((state) => state.userLoged);
  const [data, setData] = useState({});
  const [refetch, setRefetch] = useState(false);
  const { profileID } = useParams();

  useEffect(() => {
    if (profileID) {
      fetch("https://backend.lodewalter.com.ar/api/users/getProfile/" + profileID, { method: "GET" })
        .then((x) => x.json())
        .then((d) => setData(d));
    }
  }, [profileID, setData, refetch]);

  const [editarEstado, setEditar] = useState(false);
  const [datos, setDatos] = useState({
    email: { value: null, error: false },
    name: { value: null, error: false },
    loading: false,
    avatar: null,
  });

  function editEmail(data) {
    setDatos({ ...datos, email: { value: data, error: true } });
  }

  function editName(data) {
    if (data.length > 3) setDatos({ ...datos, name: { value: data, error: false } });
    else setDatos({ ...datos, name: { value: data, error: true } });
  }

  async function handleImage(e) {
    setDatos({ ...datos, loading: true });
    const response = cloudinary(e);
    const d = await response();
    setDatos({ ...datos, avatar: d, loading: false });
  }

  function guardarDatos() {
    setEditar(!editarEstado);
    fetch("https://backend.lodewalter.com.ar/api/users/editUser/" + userLoged._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: datos.name.value, email: datos.email.value, avatar: datos.avatar }),
    })
      .then((answer) => answer.json())
      .then((answerjs) => {
        if (answerjs.message === "ok") {
          setRefetch(!refetch);
          createNotification("success");
        } else createNotification("error");
      });
  }

  const createNotification = (type) => {
    switch (type) {
      case "success":
        NotificationManager.success("Datos Actualizados");
        break;
      case "error":
        NotificationManager.error("Inténtelo más tarde.", "Error Actualizando Datos", 5000);
        break;
      default:
        break;
    }
  };

  return (
    <div id="profile_general_box">
      <div id="profile_data_box">
        <div id="profile_foto_nombre">
          {editarEstado ? <input value={datos.name.value ? datos.name.value : data.name} onChange={(e) => editName(e.target.value)} /> : <h1 id="username_profile">{data.name}</h1>}
          {editarEstado ? (
            <div>
              <img src={datos.loading ? loading : datos.avatar ? datos.avatar : data.avatar} alt="vos" id="avatar" />
              <h2>Cambiar Foto: </h2>
              <input type="file" accept="image/png,image/jpeg" onChange={(e) => handleImage(e)} />
            </div>
          ) : (
            <img src={data.avatar} alt="vos" id="avatar" />
          )}
        </div>
        <div id="datos_contacto">
          <div className="datos_contacto_casilla">
            <p className="data_label">Email:</p>
            {editarEstado ? <input value={datos.email.value ? datos.email.value : data.email} onChange={(e) => editEmail(e.target.value)} /> : <p className="data_user">{data.email}</p>}
          </div>

          {editarEstado ? (
            <div id="boton_editar" onClick={() => guardarDatos()}>
              <button id="editar_btn">Guardar</button>
              <img src={guardar} alt="editar datos" id="editar_logo" />
            </div>
          ) : (
            <div id="boton_editar" onClick={() => setEditar(!editarEstado)}>
              <button id="editar_btn">Editar</button>
              <img src={editar} alt="editar datos" id="editar_logo" />
            </div>
          )}
        </div>

        <div id="direcciones_profile_box">
          <Direcciones idUser={data._id} a={refetch} b={setRefetch} />
        </div>

        <button onClick={() => dispatch(logOut())} id="cerrar_sesion_btn">
          Cerrar sesión
        </button>
      </div>

      <Ordenes ordenes={data.bills} />

      <FooterHome />
    </div>
  );
}
