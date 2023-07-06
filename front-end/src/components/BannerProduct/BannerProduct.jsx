import { useNavigate } from "react-router-dom";

export default function BannerProduct({ data }) {
  const navigate = useNavigate();

  return (
    <div className="image-container" onClick={() => navigate(`/producto/${data._id}`)}>
      <h4 className="boxpedirtitulos">{data.title}</h4>
      <img src={data.img[0]} alt="producto a la venta" className="imagesHome123"></img>
      <button className="boxpedirflecha">{">"}</button>
    </div>
  );
}
