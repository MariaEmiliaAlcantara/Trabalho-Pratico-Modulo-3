import { IApi } from "../../pages/Home/Home";
import Card from "../Card/Card";

const DespesasCards: React.FC<{ despesas: IApi[] }> = ({ despesas }) => {
  return (
    <div>
      {despesas.length > 0
        ? despesas.map((despesa) => <Card key={despesa.id} despesa={despesa} />)
        : "Não há despesas cadastradas referentes a este período"}
    </div>
  );
};

export default DespesasCards;
