import { useState } from "react";
import "./NewProduct.css";

export default function NewProduct() {
  const [datos, setDatos] = useState({ alcohol: false });

  function agregarProducto(e) {
    e.preventDefault();

    fetch("https://backend.lodewalter.com.ar/api/products/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((x) => x.json())
      .then((d) => console.log(d));
  }

  function agregarExtra(e) {
    e.preventDefault();

    fetch("https://backend.lodewalter.com.ar/api/products/addExtra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((x) => x.json())
      .then((d) => console.log(d));
  }

  function agregarBebida(e) {
    e.preventDefault();

    fetch("https://backend.lodewalter.com.ar/api/products/addBebibda", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((x) => x.json())
      .then((d) => console.log(d));
  }
  console.log(datos);
  return (
    <div>
      <form onSubmit={(e) => agregarProducto(e)} id="formProducto">
        <label>Title</label>
        <input onChange={(e) => setDatos({ ...datos, title: e.target.value })}></input>

        <label>Sub Tipos</label>
        <input onChange={(e) => setDatos({ ...datos, sub_types: e.target.value.split(",") })}></input>

        <label>Precio</label>
        <input onChange={(e) => setDatos({ ...datos, price: e.target.value })}></input>

        <label>Unidad</label>
        <input onChange={(e) => setDatos({ ...datos, unidad: e.target.value })}></input>

        <label>Imagen</label>
        <input onChange={(e) => setDatos({ ...datos, img: e.target.value.split(",") })}></input>

        <button type="submit">Agregar</button>
      </form>

      <form onSubmit={(e) => agregarExtra(e)} id="formProducto">
        <label>Title</label>
        <input onChange={(e) => setDatos({ ...datos, title: e.target.value })}></input>

        <label>Unidad</label>
        <input onChange={(e) => setDatos({ ...datos, unidad: e.target.value })}></input>

        <label>Products</label>
        <input onChange={(e) => setDatos({ ...datos, products: e.target.value.split(",") })}></input>

        <label>Precio</label>
        <input onChange={(e) => setDatos({ ...datos, price: e.target.value })}></input>

        <label>Imagen</label>
        <input onChange={(e) => setDatos({ ...datos, img: e.target.value.split(",") })}></input>

        <label>sub_type (fiambre, queso, pan)</label>
        <input onChange={(e) => setDatos({ ...datos, sub_type: e.target.value })}></input>

        <button type="submit">Agregar</button>
      </form>

      <form onSubmit={(e) => agregarBebida(e)} id="formProducto">
        <label>Title</label>
        <input onChange={(e) => setDatos({ ...datos, title: e.target.value })}></input>

        <label>Unidad</label>
        <input onChange={(e) => setDatos({ ...datos, unidad: e.target.value })}></input>

        <label>Precio</label>
        <input onChange={(e) => setDatos({ ...datos, price: e.target.value })}></input>

        <label>Alcohol</label>
        <button onClick={() => setDatos({ ...datos, alcohol: !datos.alcohol })} type="button">
          {datos.alcohol ? "Si" : "No"}
        </button>

        <label>Imagen</label>
        <input onChange={(e) => setDatos({ ...datos, img: e.target.value.split(",") })}></input>

        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}
