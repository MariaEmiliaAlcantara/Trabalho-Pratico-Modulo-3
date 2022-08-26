import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import Filter from "./components/Filter/Filter";
import DespesaTotal from "./components/DespesaTotal/DespesaTotal";
import DespesasCards from "./components/DespesasCards/DespesasCards";

export interface IApi {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

function App() {
  const [despesas, setDespesas] = useState<IApi[]>([]);
  const [filterMonth, setFilterMonth] = useState("1");
  const [filterYear, setFilterYear] = useState("2020");

  useEffect(() => {
    fetch("http://localhost:3001/despesas")
      .then((resp) => resp.json())
      .then((data) => {
        setDespesas(data);
      });
  }, []);

  useEffect(() => {
    dataFiltered(despesas, filterMonth, filterYear);
  }, [filterMonth, filterYear]);

  function handleFilterMonth(month: string) {
    setFilterMonth(month);
  }

  function handleFilterYear(year: string) {
    setFilterYear(year);
  }

  function dataFiltered(
    despesas: IApi[],
    filterMonth: string,
    filterYear: string
  ): IApi[] {
    let dateProcessed;
    if (Number(filterMonth) <= 9) {
      dateProcessed = `${filterYear}-0${filterMonth}`;
    } else {
      dateProcessed = `${filterYear}-${filterMonth}`;
    }

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

  const arrayDataFiltered = dataFiltered(despesas, filterMonth, filterYear);
  const despesaTotal = calcularDespesaTotal(arrayDataFiltered);

  return (
    <>
      <Header />
      <Filter
        setFilterMonth={handleFilterMonth}
        setFilterYear={handleFilterYear}
      />
      <DespesaTotal despesaTotal={despesaTotal} />
      <DespesasCards despesas={arrayDataFiltered} />
    </>
  );
}

export default App;
