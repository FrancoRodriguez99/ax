import { useEffect, useState } from "react";
import "./Bebida.css";
import ProductoCompraBTN from "./ProductoCompraBTN";

export default function Bebidas() {
  const [estadoG, setEstadoG] = useState(false);
  const [estadoA, setEstadoA] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://backend.lodewalter.com.ar/api/products/getBebidas/", { method: "GET" })
      .then((x) => x.json())
      .then((d) => setData(d));
  }, []);

  function calculadorBebida(x, estado) {
    const marcaGaseosa = {};

    x.forEach((element) => {
      const marca = element.unidad;
      if (!marcaGaseosa[marca]) {
        marcaGaseosa[marca] = [];
      }
      marcaGaseosa[marca].push(element);
    });

    const result = [];
    for (let property in marcaGaseosa) {
      result.push(
        <div key={property} className={estado ? "extra_box_gaseosas" : "hidden"}>
          <ProductoCompraBTN data={marcaGaseosa[property]} title={property} />
        </div>
      );
    }

    return result;
  }

  return (
    <div id="extras_box">
      <h2 className="extra_title_s2" onClick={() => setEstadoG(!estadoG)}>
        <i>Gaseosa </i> <i>{estadoG ? "▲" : "▼"}</i>
      </h2>

      {calculadorBebida(
        data.filter((x) => !x.alcohol),
        estadoG
      )}

      <h2 className="extra_title_s2" onClick={() => setEstadoA(!estadoA)}>
        <i>Alcohol </i> <i>{estadoA ? "▲" : "▼"}</i>
      </h2>
      {calculadorBebida(
        data.filter((x) => x.alcohol),
        estadoA
      )}
    </div>
  );
}
