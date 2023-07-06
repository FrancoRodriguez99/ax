import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateExtrasCart } from "../../redux/slices/cartSlice";
import "./ExtraItems.css";
import add from "../../assets/icons8-plus.svg";

export default function ExtraItems({ property, extraSubTypes }) {
  const [estado, setEstado] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.carro.extras);

  function calculatorExtraAdded(extra) {
    if (cart.filter((x) => x._id === extra._id).length > 0) {
      return (
        <div className="total_item_input">
          <button className="addorremove" onClick={() => dispatch(updateExtrasCart({ item: extra, quantity: cart.filter((a) => a._id === extra._id)[0]?.quantity - 1 }))}>
            -
          </button>
          <input type="number" step="1" className="input_add_extra" onChange={(e) => dispatch(updateExtrasCart({ item: extra, quantity: Math.round(e.target.value) }))} value={cart.filter((a) => a._id === extra._id)[0]?.quantity}></input>
          <button className="addorremove" onClick={() => dispatch(updateExtrasCart({ item: extra, quantity: cart.filter((a) => a._id === extra._id)[0]?.quantity + 1 }))}>
            +
          </button>
        </div>
      );
    } else {
      return <img src={add} alt="Agregar Extra" onClick={() => dispatch(updateExtrasCart({ item: extra, quantity: 1 }))} className="add_extra" />;
    }
  }

  return (
    <div id="extras_box">
      <h2 className="extra_title_s2" onClick={() => setEstado(!estado)}>
        <i>{property} </i> <i>{estado ? "▲" : "▼"}</i>
      </h2>
      {extraSubTypes[property].map((x) => (
        <div key={x._id} className={estado ? "extra_box" : "hidden"}>
          <label className="label_extra">
            {x.title} x {x.unidad} {x.price}$
          </label>

          {calculatorExtraAdded(x)}
        </div>
      ))}
    </div>
  );
}
