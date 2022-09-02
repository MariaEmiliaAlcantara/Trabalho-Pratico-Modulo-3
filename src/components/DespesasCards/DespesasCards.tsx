import { TableCell } from "@mui/material";
import { IApi } from "../../pages/Home/Home";
import Card from "../Card/Card";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const DespesasCards: React.FC<{ despesas: IApi[] }> = ({ despesas }) => {
  return (
    <TableContainer component={Paper} className="cardWrapper">
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Categoria</TableCell>
            <TableCell align="center">Dia</TableCell>
            <TableCell align="center">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {despesas.length > 0 ? (
            despesas.map((despesa) => (
              <Card key={despesa.id} despesa={despesa} />
            ))
          ) : (
            <TableCell>
              Não há despesas cadastradas referentes a este período
            </TableCell>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DespesasCards;
