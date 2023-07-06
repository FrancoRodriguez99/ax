import { useEffect, useState } from "react";

export default function useAddress(id) {
  const [datos, setData] = useState([]);

  const [resync, reFetch] = useState(true);

  useEffect(() => {
    fetch("https://backend.lodewalter.com.ar/api/users/address/" + id, { method: "GET" })
      .then((answer) => answer.json())
      .then((answerjs) => setData(answerjs));
  }, [id, resync]);

  return { datos, reFetch, resync };
}
