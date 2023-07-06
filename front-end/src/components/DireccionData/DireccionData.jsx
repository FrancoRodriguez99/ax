import { useState } from "react";
import "./DireccionData.css";
import { useEffect } from "react";

export default function DireccionData({ data, editar, onInput }) {
  const [address, setAddress] = useState({});

  useEffect(() => {
    if (address && data?._id) onInput(address, data._id);
    //eslint-disable-next-line
  }, [address, data]);

  if (data)
    return (
      <div id="data_direccion_box">
        <div>{editar ? <input className="editInputDireccion" value={address.address ? address.address : data.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} /> : <p className="data_addres_p">{data.address}</p>}</div>
        <div>{editar ? <input className="editInputDireccion" value={address.tel ? address.tel : data.tel} onChange={(e) => setAddress({ ...address, tel: e.target.value })} /> : <p className="data_addres_p">{data.tel}</p>}</div>
      </div>
    );
  else return <div>Seleccione una dirección o agregué una nueva</div>;
}
