const DespesaTotal: React.FC<{ despesaTotal: number }> = ({ despesaTotal }) => {
  return <div>Despesa total: {Number(despesaTotal.toFixed(2))}</div>;
};

export default DespesaTotal;
