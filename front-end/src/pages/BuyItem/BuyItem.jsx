import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BuyItem.css";
import FooterHome from "../Home/FooterHome";
import ExtraItems from "../../components/ExtraItems/ExtraItems";
import { useDispatch, useSelector } from "react-redux";
import { updateProductCart } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import Bebidas from "../../components/Bebidas/Bebidas";

export default function BuyItem() {
  const { id } = useParams();
  const [data, setData] = useState({ img: [] });
  const dispatch = useDispatch();
  const carro = useSelector((state) => state.cart.carro);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let productos = carro.productos.filter((x) => x._id === data._id);
    let arrayPrecioProducto = productos.map((x) => x.quantity * x.price);

    const totalProd = arrayPrecioProducto.reduce((partialSum, a) => partialSum + a, 0);

    let extras = carro.extras.filter((x) => x.products[0] === data._id);
    let arrayPrecioExtras = extras.map((x) => x.quantity * x.price);

    const totalExtras = arrayPrecioExtras.reduce((partialSum, a) => partialSum + a, 0);

    setTotal(totalProd + totalExtras);
  }, [carro, data._id]);

  useEffect(() => {
    fetch("https://backend.lodewalter.com.ar/api/products/getProduct/" + id, { method: "GET" })
      .then((x) => x.json())
      .then((d) => setData(d));
  }, [id]);

  function calculadorExtras() {
    const extraSubTypes = {};
    data.extras?.forEach((element) => {
      const subType = element.sub_type;
      if (!extraSubTypes[subType]) {
        extraSubTypes[subType] = [];
      }
      extraSubTypes[subType].push(element);
    });

    const result = [];

    for (let property in extraSubTypes) {
      result.push(<ExtraItems property={property} extraSubTypes={extraSubTypes} key={property} />);
    }

    return result.map((x) => x);
  }

  return (
    <div id="buyItem_container">
      <div id="box_principal_items">
        <button id="goBackBTN" onClick={() => navigate(-1)}>
          {"<"}
        </button>
        <div id="box_data_product">
          <img src={data.img[1]} alt="producto" id="photo_product" />
          <div id="compras_config">
            <h1 id="titulo_item_buy">{data.title}</h1>
            <p id="instructions_item_buy">
              Selecciona la cantidad total de {data.title} y de los ingredientes extra que querés sumarle a tu {data.title}, recordá que podés sumar bebidas.
            </p>
            <div id="total_of_item">
              Cantidad por {data.unidad}{" "}
              <input
                step="1"
                type="number"
                className="total_item_input"
                onChange={(e) => dispatch(updateProductCart({ item: { ...data, extras: null }, quantity: parseInt(Math.round(e.target.value)) }))}
                value={
                  carro.productos
                    .filter((x) => x._id === data._id)[0]
                    ?.quantity.toString()
                    .replace(/^0+/, "") || 0
                }
              />
              {data.price + "$ " + data.unidad}
            </div>
            <h2 id="extra_title">Extras</h2>
            {calculadorExtras()}

            <h2 id="extra_title">Bebidas</h2>
            <Bebidas />

            <div id="precio_total_box">
              <h3 id="precio_total">
                Precio {data.title} Con extras {}$
              </h3>
              <div id="total_cart">{total}</div>
            </div>
            <div id="precio_total_box">
              <h3 id="precio_total">Precio Total del pedido</h3>
              <div id="total_cart">{carro.total}</div>
            </div>
          </div>
        </div>
      </div>
      <div id="botones_compra">
        <Link id="seguir_comprando" to="/">
          Seguir Comprando
        </Link>
        <Link id="comprar_ahora" to="/confirmPurchase">
          Comprar Ahora
        </Link>
      </div>

      <FooterHome />
    </div>
  );
}
