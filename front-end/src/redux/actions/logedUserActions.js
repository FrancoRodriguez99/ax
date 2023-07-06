import { logIn } from "../slices/userLogedSlice";

export const loginAction = (data) => async (dispatch) => {
  return fetch(`https://backend.lodewalter.com.ar/api/users/signIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  })
    .then((response) => response.json())
    .then((d) => {
      if (d.message === "ok") dispatch(logIn(d.data.user));
      else return d.message;
    })
    .catch((e) => e);
};

export const loginGoogle = (data) => async (dispatch) => {
  return fetch(`https://backend.lodewalter.com.ar/api/users/googleLogIn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      avatar: data.picture,
      name: data.name,
      password: data.sub,
    }),
  })
    .then((response) => response.json())
    .then((d) => {
      dispatch(logIn(d.data.user));
    })
    .catch((e) => e);
};
