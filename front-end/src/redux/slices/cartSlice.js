import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carro: {
    productos: [],
    extras: [],
    bebidas: [],
    total: 0,
  },
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateExtrasCart: (state, { payload }) => {
      if (payload.quantity > 0) {
        let indice = 0;
        let newArray = state.carro.extras.filter((x, i) => {
          if (x._id === payload.item._id) {
            indice = i;
          }

          return x._id === payload.item._id;
        });
        if (newArray.length > 0) {
          state.carro.extras[indice].quantity = payload.quantity;
        } else {
          state.carro.extras.push({ ...payload.item, quantity: payload.quantity });
        }
      } else {
        state.carro.extras = state.carro.extras.filter((x) => x._id !== payload.item._id);
      }
      localStorage.setItem("cart", JSON.stringify(state.carro));
    },
    updateProductCart: (state, { payload }) => {
      if (payload.quantity > 0) {
        let indice = 0;
        let newArray = state.carro.productos.filter((x, i) => {
          if (x._id === payload.item._id) {
            indice = i;
          }

          return x._id === payload.item._id;
        });
        if (newArray.length > 0) {
          state.carro.productos[indice].quantity = payload.quantity;
        } else {
          state.carro.productos.push({ ...payload.item, quantity: payload.quantity });
        }
      } else {
        state.carro.productos = state.carro.productos.filter((x) => x._id !== payload.item._id);
      }
      localStorage.setItem("cart", JSON.stringify(state.carro));
    },
    updateBebidas: (state, { payload }) => {
      if (payload.quantity > 0) {
        let indice = 0;
        let newArray = state.carro.bebidas.filter((x, i) => {
          if (x._id === payload.item._id) {
            indice = i;
          }

          return x._id === payload.item._id;
        });
        if (newArray.length > 0) {
          state.carro.bebidas[indice].quantity = payload.quantity;
        } else {
          state.carro.bebidas.push({ ...payload.item, quantity: payload.quantity });
        }
      } else {
        state.carro.bebidas = state.carro.bebidas.filter((x) => x._id !== payload.item._id);
      }
      localStorage.setItem("cart", JSON.stringify(state.carro));
    },
    total: (state, { payload }) => {
      state.carro.total = payload;
    },
    deleteCart: (state) => {
      state.carro.productos = [];
      state.carro.extras = [];
      state.carro.bebidas = [];
      state.carro.total = 0;
      localStorage.setItem("cart", JSON.stringify({ productos: [], extras: [], bebidas: [], total: 0 }));
    },
    insertCart: (state, { payload }) => {
      state.carro.productos = payload?.productos || [];
      state.carro.extras = payload?.extras || [];
      state.carro.bebidas = payload?.bebidas || [];
      state.carro.total = payload?.total || [];
    },
  },
});

export const { updateExtrasCart, updateProductCart, total, updateBebidas, deleteCart, insertCart } = cart.actions;
export default cart.reducer;
