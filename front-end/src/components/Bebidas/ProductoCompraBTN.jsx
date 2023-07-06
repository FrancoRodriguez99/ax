import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBebidas } from "../../redux/slices/cartSlice";

export default function ProductoCompraBTN({ data, title }) {
  const [estado, setEstado] = useState(false);
  const dispatch = useDispatch();
  const carroBebidas = useSelector((state) => state.cart.carro.bebidas);

  return (
    <div className="gaseosas_hiadd">
      <label className="label_extra_gaseosas" onClick={() => setEstado(!estado)}>
        {title}
      </label>
      <div className="boxes_logos">
        {data?.map((x) => (
          <div key={x._id} className={estado ? "productoCompraBTN" : "hidden"}>
            {carroBebidas.filter((tx) => tx._id === x._id).length > 0 ? (
              <div className="bebidas_comprar">
                {x.title}
                <div className="total_item_input">
                  <button className="addorremove" onClick={() => dispatch(updateBebidas({ item: x, quantity: carroBebidas.filter((a) => a._id === x._id)[0]?.quantity - 1 }))}>
                    -
                  </button>
                  <input type="number" step="1" className="input_add_extra" onChange={(e) => dispatch(updateBebidas({ item: x, quantity: Math.round(e.target.value) }))} value={carroBebidas.filter((a) => a._id === x._id)[0]?.quantity}></input>
                  <button className="addorremove" onClick={() => dispatch(updateBebidas({ item: x, quantity: carroBebidas.filter((a) => a._id === x._id)[0]?.quantity + 1 }))}>
                    +
                  </button>
                </div>
              </div>
            ) : (
              <img src={x.img[0]} alt={x.title} className="bebida_logo" onClick={() => dispatch(updateBebidas({ item: x, quantity: 1 }))}></img>
            )}
            <p>{x.price}$</p>
          </div>
        ))}
      </div>
    </div>
  );
}
