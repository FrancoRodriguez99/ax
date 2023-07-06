import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetails.css";

export default function OrderDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://backend.lodewalter.com.ar/api/mercadopago/getorder/" + id, { method: "GET" })
      .then((x) => x.json())
      .then((d) => setData(d));
  }, [id]);

  return (
    <div id="detallesorden">
      <div className="display_carro_productos">
        {data.productos?.length > 0 ? <div className="title_section">Productos</div> : null}
        {data.productos?.map((x) => (
          <div key={x._id} className="checkout_item_box">
            <div className="title_input">
              {x.title}
              <input step="1" type="number" className="total_item_input" value={x.quantity} />
              {x.price + "$ x " + x.unidad}
            </div>

            <div className="total_borrar">
              <div className="total_section"> {x.price * x.quantity} </div>
            </div>
          </div>
        ))}

        {data.extras?.length > 0 ? <div className="title_section">Extras</div> : null}

        {data.extras?.map((x) => (
          <div key={x._id} className="checkout_item_box">
            <div className="title_input">
              {x.title}
              <input step="1" type="number" className="total_item_input" value={x.quantity} />
              {x.price + "$ x " + x.unidad}
            </div>
            <div className="total_borrar">
              <div className="total_section"> {x.price * x.quantity} </div>
            </div>
          </div>
        ))}

        {data.bebidas?.length > 0 ? <div className="title_section">Bebidas</div> : null}

        {data.bebidas?.map((x) => (
          <div key={x._id} className="checkout_item_box">
            <div className="title_input">
              {x.title} {" " + x.unidad}
              <input step="1" type="number" className="total_item_input" value={x.quantity} />
              {x.price + "$ "}
            </div>
            <div className="total_borrar">
              <div className="total_section"> {x.price * x.quantity} </div>
            </div>
          </div>
        ))}

        <div className="total_section">
          Precio Total : <div className="total_section"> {data.order.total} </div>
        </div>
      </div>
    </div>
  );
}
