import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Filter from "../../components/Filter/Filter";
import DespesaTotal from "../../components/DespesaTotal/DespesaTotal";
import DespesasCards from "../../components/DespesasCards/DespesasCards";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getUserEndpoint, IUser } from "../../backend";
import LoginPage from "../Login/Login";

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
  const [user, setUser] = useState<IUser | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch("http://localhost:3004/despesas?_sort=dia")
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setDespesas(data);
        })
        .catch(() => console.log("erro ao consumir despesas"));
    }
  }, [user]);

  useEffect(() => {
    getUserEndpoint().then(setUser, () => setUser(null));
  }, []);

  useEffect(() => {
    const { date } = params;
    if (date) {
      let [year, month] = date.split("-");
      month = Number(month) < 10 ? month[1] : month;
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

  console.log(arrayDataFiltered);

  const handleOnSignOut = (param: any) => {
    setUser(param);
  };

  if (user) {
    return (
      <>
        <Header handleOnSignOut={handleOnSignOut} />
        <Filter
          handleFilterMonth={handleFilterMonth}
          handleFilterYear={handleFilterYear}
        />
        <DespesaTotal despesaTotal={despesaTotal} />
        <DespesasCards despesas={arrayDataFiltered} />
      </>
    );
  } else {
    return (
      <>
        <LoginPage onSignIn={setUser} />
      </>
    );
  }
}

export default Home;
