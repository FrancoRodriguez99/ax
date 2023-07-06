import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import LogIn from "./pages/LogIn/LogIn";
import NavBar from "./components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Profile from "./pages/Profile/Profile";
import { logIn } from "./redux/slices/userLogedSlice";
import NewProduct from "./pages/NewProduct/NewProduct";
import BuyItem from "./pages/BuyItem/BuyItem";
import { total, insertCart } from "./redux/slices/cartSlice";
import ConfirmPurchase from "./pages/ConfirmPurchase/ConfirmPurchase";
import OrderDetails from "./pages/OrderDetails/OrderDetails";

function App() {
  const userLoged = useSelector((state) => state.userLoged);
  const carro = useSelector((state) => state.cart.carro);
  const dispatch = useDispatch();

  useEffect(() => {
    let productos = carro.productos.map((x) => x.quantity * x.price);
    let extras = carro.extras.map((x) => x.quantity * x.price);
    let bebidas = carro.bebidas.map((x) => x.quantity * x.price);

    const totalProd = productos.reduce((partialSum, a) => partialSum + a, 0);
    const totalExtr = extras.reduce((partialSum, a) => partialSum + a, 0);
    const totalBebid = bebidas.reduce((partialSum, a) => partialSum + a, 0);

    dispatch(total(totalBebid + totalExtr + totalProd));
  }, [carro, dispatch]);

  useEffect(() => {
    dispatch(insertCart(JSON.parse(window.localStorage.getItem("cart"))));
  }, [dispatch]);

  useEffect(() => {
    if (userLoged.loged === false) {
      const userLocal = JSON.parse(window.localStorage.getItem("user"));
      if (userLocal !== null) {
        dispatch(logIn(userLocal));
      }
    }
  }, [userLoged, dispatch]);

  function logedCheck() {
    if (userLoged.loged === false) {
      return (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/profile/:profileID" element={<LogIn />}></Route>
            <Route path="/newProduct" element={<NewProduct />}></Route>
            <Route path="/producto/:id" element={<LogIn />}></Route>
            <Route path="/confirmPurchase" element={<LogIn />}></Route>
            <Route path="/order/:id" element={<LogIn />}></Route>
          </Routes>
        </>
      );
    } else {
      return (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Home />}></Route>
            <Route path="/login" element={<Home />}></Route>
            <Route path="/profile/:profileID" element={<Profile />}></Route>
            <Route path="/newProduct" element={<NewProduct />}></Route>
            <Route path="/producto/:id" element={<BuyItem />}></Route>
            <Route path="/confirmPurchase" element={<ConfirmPurchase />}></Route>
            <Route path="/order/:id" element={<OrderDetails />}></Route>
          </Routes>
        </>
      );
    }
  }

  return <div>{logedCheck()}</div>;
}

export default App;
