import { IApi } from "../../App";
import Card from "../Card/Card";

const DespesasCards: React.FC<{ despesas: IApi[] }> = ({ despesas }) => {
  return (
    <div>
      {despesas.map((despesa) => (
        <Card key={despesa.id} despesa={despesa} />
      ))}
    </div>
  );
};

export default DespesasCards;
