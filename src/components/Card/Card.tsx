import { IApi } from "../../pages/Home/Home";
import "./Card.css";

import TableCell from "@mui/material/TableCell";

import TableRow from "@mui/material/TableRow";

const Card: React.FC<{ despesa: IApi }> = ({ despesa }) => {
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      className="cardContainer"
    >
      <TableCell className="card" align="center">
        {despesa.descricao}
      </TableCell>
      <TableCell className="card" align="center">
        {despesa.categoria}
      </TableCell>
      <TableCell className="card" align="center">
        {despesa.dia}
      </TableCell>
      <TableCell className="card" align="center">
        R${despesa.valor.toFixed(2).replace(".", ",")}
      </TableCell>
    </TableRow>
  );
};

export default Card;
