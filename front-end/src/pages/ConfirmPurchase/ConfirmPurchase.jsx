import { useDispatch, useSelector } from "react-redux";
import "./ConfirmPuchase.css";
import Direcciones from "../../components/Direcciones/Direcciones";
import { useState } from "react";
import Popup from "reactjs-popup";
import trash from "../../assets/trash.png";
import { updateProductCart, updateExtrasCart } from "../../redux/slices/cartSlice";
import { updateBebidas, deleteCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import FooterHome from "../Home/FooterHome";

export default function ConfirmPurchase() {
  const carro = useSelector((state) => state.cart.carro);
  const usuario = useSelector((state) => state.userLoged);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function generateMPOrder() {
    setLoading(true);
    if (usuario.selectedAddres)
      fetch("https://backend.lodewalter.com.ar/api/mercadopago/generateBill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carro, idUser: usuario._id, idAddress: usuario.selectedAddres }),
      })
        .then((x) => x.json())
        .then((d) => {
          dispatch(deleteCart());
          window.location.replace(d);
        });
    setLoading(false);
  }

  function generateEfectivo() {
    if (usuario.selectedAddres)
      fetch("https://backend.lodewalter.com.ar/api/mercadopago/generateBillEfectivo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carro, idUser: usuario._id, idAddress: usuario.selectedAddres }),
      })
        .then((x) => x.json())
        .then((d) => {
          dispatch(deleteCart());
          navigate("/order/" + d._id);
        });
  }

  return (
    <div id="confirm_Box">
      <div className="display_carro_productos">
        {carro.productos.length > 0 ? <div className="title_section">Productos</div> : null}
        {carro.productos?.map((x) => (
          <div key={x._id} className="checkout_item_box">
            <div className="title_input">
              {x.title}
              <input
                step="1"
                type="number"
                className="total_item_input"
                onChange={(e) => {
                  if (e.target.value > 0) dispatch(updateProductCart({ item: { ...x, extras: null }, quantity: parseInt(Math.round(e.target.value)) }));
                }}
                value={
                  carro.productos
                    .filter((xi) => xi._id === x._id)[0]
                    ?.quantity.toString()
                    .replace(/^0+/, "") || 0
                }
              />
              {x.price + "$ x " + x.unidad}
            </div>

            <div className="total_borrar">
              <div className="total_section"> {x.price * x.quantity} </div>
              <img alt="borrar" src={trash} className="trash" onClick={() => dispatch(updateProductCart({ item: { ...x, extras: null }, quantity: 0 }))}></img>
            </div>
          </div>
        ))}

        {carro.extras.length > 0 ? <div className="title_section">Extras</div> : null}

        {carro.extras?.map((x) => (
          <div key={x._id} className="checkout_item_box">
            <div className="title_input">
              {x.title}
              <input
                step="1"
                type="number"
                className="total_item_input"
                onChange={(e) => {
                  if (e.target.value > 0) dispatch(updateExtrasCart({ item: { ...x, extras: null }, quantity: parseInt(Math.round(e.target.value)) }));
                }}
                value={
                  carro.extras
                    .filter((xi) => xi._id === x._id)[0]
                    ?.quantity.toString()
                    .replace(/^0+/, "") || 0
                }
              />
              {x.price + "$ x " + x.unidad}
            </div>
            <div className="total_borrar">
              <div className="total_section"> {x.price * x.quantity} </div>
              <img alt="borrar" src={trash} className="trash" onClick={() => dispatch(updateExtrasCart({ item: { ...x, extras: null }, quantity: 0 }))}></img>
            </div>
          </div>
        ))}

        {carro.bebidas.length > 0 ? <div className="title_section">Bebidas</div> : null}

        {carro.bebidas?.map((x) => (
          <div key={x._id} className="checkout_item_box">
            <div className="title_input">
              {x.title} {" " + x.unidad}
              <input
                step="1"
                type="number"
                className="total_item_input"
                onChange={(e) => {
                  if (e.target.value > 0) dispatch(updateBebidas({ item: { ...x, extras: null }, quantity: parseInt(Math.round(e.target.value)) }));
                }}
                value={
                  carro.bebidas
                    .filter((xi) => xi._id === x._id)[0]
                    ?.quantity.toString()
                    .replace(/^0+/, "") || 0
                }
              />
              {x.price + "$ "}
            </div>
            <div className="total_borrar">
              <div className="total_section"> {x.price * x.quantity} </div>
              <img alt="borrar" src={trash} className="trash" onClick={() => dispatch(updateBebidas({ item: { ...x, extras: null }, quantity: 0 }))}></img>
            </div>
          </div>
        ))}

        <div className="total_section">
          Precio Total : <div className="total_section"> {carro.total} </div>
        </div>
      </div>

      <div id="pago_entrega_box">
        <div id="entrega_en">
          <div>Entrega en: {usuario.direccion}</div>
          <button onClick={() => setOpen(true)} id="cambiar">
            Cambiar
          </button>
        </div>

        <div id="mp_button" onClick={() => generateMPOrder()}>
          {loading ? "Redirigiendo..." : "Mercado Pago"}
        </div>

        <button id="pago_efectivo" onClick={() => generateEfectivo()}>
          Pagar en efectivo
        </button>
      </div>

      <Popup open={open} modal nested closeOnDocumentClick={false}>
        {() => (
          <div id="Modal_box">
            <div id="confirmar_direccion_title">Confirmar Dirección</div>
            <div>
              <Direcciones />
            </div>
            <div className="actions">
              <button id="button_confirmar_modal" onClick={() => setOpen(false)} disabled={!usuario.selectedAddres}>
                Confirmar
              </button>
            </div>
          </div>
        )}
      </Popup>
      <FooterHome />
    </div>
  );
}
