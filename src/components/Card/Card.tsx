import { IApi } from "../../App";
import "./Card.css";

const Card: React.FC<{ despesa: IApi }> = ({ despesa }) => {
  return (
    <div className="cardContainer">
      <div className="card">{despesa.descricao}</div>
      <div className="card">{despesa.categoria}</div>
      <div className="card">{despesa.dia}</div>
      <div className="card">R${String(despesa.valor).replace(".", ",")}</div>
    </div>
  );
};

export default Card;
