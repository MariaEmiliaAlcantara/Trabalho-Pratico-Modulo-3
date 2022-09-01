import { useParams } from "react-router-dom";

export interface IFilterProps {
  handleFilterMonth: (month: string) => void;
  handleFilterYear: (year: string) => void;
}

const Filter = ({ handleFilterMonth, handleFilterYear }: IFilterProps) => {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const years = ["2020", "2021"];

  const { date } = useParams();
  let monthParams = date?.split("-")[1];
  let yearParams = date?.split("-")[0];

  return (
    <div className="filter">
      <div className="monthFilter">
        <label>
          Mês
          <select
            name="month"
            id="month"
            defaultValue={Number(monthParams) ? Number(monthParams) : 6}
            onChange={(e) => {
              handleFilterMonth(e.target.value);
            }}
          >
            {months.map((month, i) => {
              return (
                <option key={i} value={i + 1}>
                  {month}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div className="yearFilter">
        <label>
          Ano
          <select
            name="year"
            id="year"
            defaultValue={Number(yearParams) ? Number(yearParams) : 2020}
            onChange={(e) => handleFilterYear(e.target.value)}
          >
            {years.map((year, i) => {
              return (
                <option key={i} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </label>
      </div>
    </div>
  );
};

export default Filter;
