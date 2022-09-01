import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";

import Filter from "../../components/Filter/Filter";
import DespesaTotal from "../../components/DespesaTotal/DespesaTotal";
import DespesasCards from "../../components/DespesasCards/DespesasCards";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export interface IApi {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

function Home() {
  const [despesas, setDespesas] = useState<IApi[]>([]);
  const [filterMonth, setFilterMonth] = useState<string>("6");
  const [filterYear, setFilterYear] = useState<string>("2020");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/despesas?_sort=dia")
      .then((resp) => resp.json())
      .then((data) => {
        setDespesas(data);
      });
  }, []);

  useEffect(() => {
    const { date } = params;
    if (date) {
      let [year, month] = date.split("-");
      month = month.length == 1 ? month : month[1];
      setFilterYear(year);
      setFilterMonth(month);
    }
  }, [params]);

  useEffect(() => {
    dataFiltered(despesas, dateFiltered);
  }, [filterMonth, filterYear]);

  function handleFilterMonth(month: string) {
    setFilterMonth(month);
    const dateFiltered = dateProcessed(month, filterYear);
    navigate(`/despesas/${dateFiltered}`);
  }

  function handleFilterYear(year: string) {
    setFilterYear(year);
    const dateFiltered = dateProcessed(filterMonth, year);
    navigate(`/despesas/${dateFiltered}`);
  }

  function dateProcessed(filterMonth: string, filterYear: string) {
    let dateProcessed;
    if (Number(filterMonth) <= 9) {
      dateProcessed = `${filterYear}-0${filterMonth}`;
    } else {
      dateProcessed = `${filterYear}-${filterMonth}`;
    }
    return dateProcessed;
  }
  const dateFiltered = dateProcessed(filterMonth, filterYear);

  function dataFiltered(despesas: IApi[], dateProcessed: string): IApi[] {
    let arrayDataFiltered = [];
    for (const despesa of despesas) {
      if (despesa.mes == dateProcessed) {
        arrayDataFiltered.push(despesa);
      }
    }
    return arrayDataFiltered;
  }

  function calcularDespesaTotal(arrayDataFiltered: IApi[]): number {
    let despesaTotal = 0;
    for (const despesa of arrayDataFiltered) {
      despesaTotal += despesa.valor;
    }
    return despesaTotal;
  }

  const arrayDataFiltered = dataFiltered(despesas, dateFiltered);
  const despesaTotal = calcularDespesaTotal(arrayDataFiltered);

  return (
    <>
      <Header />
      <Filter
        handleFilterMonth={handleFilterMonth}
        handleFilterYear={handleFilterYear}
      />
      <DespesaTotal despesaTotal={despesaTotal} />
      <DespesasCards despesas={arrayDataFiltered} />
    </>
  );
}

export default Home;
