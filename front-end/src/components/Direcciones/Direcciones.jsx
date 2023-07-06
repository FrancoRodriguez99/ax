import { useState } from "react";
import useAddress from "../../hooks/useAddress";
import DireccionData from "../DireccionData/DireccionData";
import { useDispatch, useSelector } from "react-redux";
import "./Direcciones.css";
import { selectAddres } from "../../redux/slices/userLogedSlice";

export default function Direcciones() {
  const idUser = useSelector((state) => state.userLoged._id);
  const { datos, reFetch, resync } = useAddress(idUser);
  const [address, setAddress] = useState({});
  const idSelected = useSelector((state) => state.userLoged.selectedAddres);
  const [open, setOpen] = useState(idSelected ? false : true);
  const [newd, setNewd] = useState(false);
  const dispatch = useDispatch();
  const [editar, setEditar] = useState(false);
  const [childEditer, setChildEditer] = useState({});

  function saveAddress() {
    fetch("https://backend.lodewalter.com.ar/api/users/address/" + idUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    })
      .then((answer) => answer.json())
      .then((answerjs) => {
        if (answerjs.message === "ok") reFetch(!resync);
      });
  }

  function deleteAddress(id) {
    fetch("https://backend.lodewalter.com.ar/api/users/deleteAddress/" + id, {
      method: "DELETE",
    })
      .then((answer) => answer.json())
      .then((answerjs) => {
        if (answerjs.message === "ok") reFetch(!resync);
      });

    dispatch(selectAddres(""));
  }

  const handleChildInput = (addresEdited, id) => {
    setChildEditer({ addresEdited, id });
  };

  function editData() {
    if (editar) {
      fetch("https://backend.lodewalter.com.ar/api/users/changeAddres/" + childEditer.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(childEditer.addresEdited),
      })
        .then((answer) => answer.json())
        .then((answerjs) => {
          if (answerjs.message === "ok") reFetch(!resync);
        });

      setEditar(false);
    } else setEditar(true);
  }

  function addNewForm() {
    return (
      <div id="nueva_direccion">
        <div id="nueva_direccion_title">Agregar Dirección</div>
        <div id="form_box_direccion">
          <div>
            <label className="label_direccion">Título</label>
            <input className="input_direccion" placeholder="Casa tíos" onChange={(e) => setAddress({ ...address, title: e.target.value })}></input>
          </div>
          <div>
            <label className="label_direccion">Dirección</label>
            <input className="input_direccion" placeholder="Entre Ríos 1490" onChange={(e) => setAddress({ ...address, address: e.target.value })}></input>
          </div>
          <div>
            <label className="label_direccion">Teléfono/Celular</label>
            <input className="input_direccion" placeholder="223-541-9874" onChange={(e) => setAddress({ ...address, tel: e.target.value })}></input>
          </div>
          <button
            onClick={() => {
              saveAddress();
              setNewd(false);
            }}
            className="direccion_confirmar"
          >
            Guardar
          </button>
        </div>
      </div>
    );
  }

  if (!newd) {
    return (
      <div id="box_direcciones">
        <div onClick={() => setOpen(!open)} id="selector_direccion">
          <p>{datos.filter((x) => x._id === idSelected)[0]?.title || "Seleccione domicilio"}</p>
          <p>{open ? "▲" : "▼"}</p>
        </div>
        {open ? (
          datos.length > 0 ? (
            <div className="lista_domicilios">
              {datos.map((x) => (
                <div
                  key={x._id}
                  onClick={() => {
                    dispatch(selectAddres({ id: x._id, title: x.title }));
                    setOpen(false);
                  }}
                >
                  {x.title}
                </div>
              ))}
            </div>
          ) : (
            <div>"No hay direcciones, agregue una nueva." </div>
          )
        ) : (
          <DireccionData data={datos.filter((x) => x._id === idSelected)[0]} editar={editar} onInput={handleChildInput} />
        )}

        <div id="direcciones_opciones">
          <button className="editarnueva_direccion" onClick={() => setNewd(true)}>
            Nueva
          </button>
          <button
            className="editarnueva_direccion"
            onClick={() => {
              if (editar) editData();
              else setEditar(true);
            }}
          >
            {editar ? "Guardar" : "Editar"}
          </button>
          <button id="eliminar_direccion" onClick={() => deleteAddress(idSelected)}>
            Eliminar
          </button>
        </div>
      </div>
    );
  } else return addNewForm();
}

/*
<div className="datos_contacto_casilla">
            <p className="data_label">Teléfono/celular:</p>
            {editarEstado ? <input value={datos.tel.value ? datos.tel.value : userLoged.phone} onChange={(e) => editTel(e.target.value)} /> : <p className="data_user">{userLoged.phone}</p>}
          </div>
          <div className="datos_contacto_casilla">
            <p className="data_label">Dirección:</p>
            {editarEstado ? <input value={datos.address.value ? datos.address.value : userLoged.direccion} onChange={(e) => editAddress(e.target.value)} /> : <p className="data_user">{userLoged.direccion}</p>}
          </div>
          */
