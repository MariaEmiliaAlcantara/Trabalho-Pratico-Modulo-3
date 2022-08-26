export interface IFilterProps {
  setFilterMonth: (month: string) => void;
  setFilterYear: (year: string) => void;
}

const Filter = ({ setFilterMonth, setFilterYear }: IFilterProps) => {
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

  return (
    <div className="filter">
      <div className="monthFilter">
        <label>
          Mês
          <select
            name="month"
            id="month"
            onChange={(e) => {
              setFilterMonth(e.target.value);
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
            onChange={(e) => setFilterYear(e.target.value)}
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
