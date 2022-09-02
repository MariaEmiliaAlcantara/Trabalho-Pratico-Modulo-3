import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./DespesaTotal.css";

const DespesaTotal: React.FC<{ despesaTotal: number }> = ({ despesaTotal }) => {
  return (
    <Card>
      <CardContent className="despesaTotal">
        <Typography>
          Despesa total: {Number(despesaTotal.toFixed(2))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DespesaTotal;
