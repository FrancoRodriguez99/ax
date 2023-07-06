import { Link } from "react-router-dom";
import efectivo from "../../assets/efectivo.png";
import mercadopago from "../../assets/mercadopago.png";
import "./OrdenesList.css";

export default function OrdenesList({ data }) {
  return (
    <Link className="ordenes_item" to={"/order/" + data._id}>
      <img src={data.type ? mercadopago : efectivo} className="metodo_pago" alt={data.type}></img>
      <div>Total: {data.total}</div>
      <div>Fecha: {data.fecha.split("T")[0]}</div>
    </Link>
  );
}
