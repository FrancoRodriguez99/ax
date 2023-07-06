import { useEffect, useState } from "react";
import "./Ordenes.css";
import OrdenesList from "../OrdenesList/OrdenesList";

export default function Ordenes({ ordenes }) {
  const [filterOrders, setFilterOrders] = useState({ filtered: false });
  const [btnState, setbtnState] = useState("entregado");

  useEffect(() => {
    setFilterOrders({
      entregado: ordenes?.filter((x) => x.entregado),
      pagado: ordenes?.filter((x) => x.pagado && !x.entregadas),
      waiting_confirm: ordenes?.filter((x) => !x.pagado),
      filtered: true,
    });
  }, [ordenes]);

  return (
    <div id="ordenes_box">
      <div id="btn_ordenes_box">
        <button className={btnState === "entregado" ? "btn_ordenes_selected" : "btn_ordenes"} onClick={() => setbtnState("entregado")}>
          Entregado
        </button>
        <button className={btnState === "pagado" ? "btn_ordenes_selected" : "btn_ordenes"} onClick={() => setbtnState("pagado")}>
          En preparación
        </button>
        <button className={btnState === "waiting_confirm" ? "btn_ordenes_selected" : "btn_ordenes"} onClick={() => setbtnState("waiting_confirm")}>
          Esperando Pago
        </button>
      </div>
      <div>
        {filterOrders[btnState]?.map((x) => (
          <OrdenesList data={x} key={x._id} />
        ))}
      </div>
    </div>
  );
}
