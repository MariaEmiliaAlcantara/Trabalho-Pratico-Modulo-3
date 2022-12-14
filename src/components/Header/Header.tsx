import "./Header.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Header({ handleOnSignOut }: any) {
  return (
    <Box className="header" sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Despesas pessoais
          </Typography>
          <Button
            onClick={() => {
              handleOnSignOut(null);
            }}
            color="inherit"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
