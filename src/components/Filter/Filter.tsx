import { useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./Filter.css";

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

  const handleChangeMonth = (event: SelectChangeEvent) => {
    handleFilterMonth(event.target.value as string);
  };

  const handleChangeYear = (event: SelectChangeEvent) => {
    handleFilterYear(event.target.value as string);
  };

  return (
    <div className="filter">
      <div className="monthFilter">
        <InputLabel>
          Mês
          <Select
            className="selectFilter"
            name="month"
            id="month"
            defaultValue={Number(monthParams) ? Number(monthParams) : 6}
            onChange={handleChangeMonth}
          >
            {months.map((month, i) => {
              return (
                <MenuItem key={i} value={i + 1}>
                  {month}
                </MenuItem>
              );
            })}
          </Select>
        </InputLabel>
      </div>
      <div className="yearFilter">
        <InputLabel>
          Ano
          <Select
            className="selectFilter"
            name="year"
            id="year"
            defaultValue={Number(yearParams) ? Number(yearParams) : 2020}
            onChange={handleChangeYear}
          >
            {years.map((year, i) => {
              return (
                <MenuItem key={i} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </InputLabel>
      </div>
    </div>
  );
};

export default Filter;
