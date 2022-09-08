import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";
import { useState } from "react";
import { IUser, signInEndpoint } from "../../backend";

export interface ILoginPageProps {
  onSignIn: (user: IUser) => void;
}

const LoginPage = (props: ILoginPageProps) => {
  const { onSignIn } = props;
  const [email, setEmail] = useState("usuario@email.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    signInEndpoint(email, password).then(onSignIn, () =>
      setError("E-mail ou senha incorretos")
    );
  }

  return (
    <Container maxWidth="sm" className="loginWrapper">
      <h1>Login</h1>
      <p>Digite o seu email e senha abaixo</p>
      <form onSubmit={signIn} className="form">
        <TextField
          fullWidth
          id="emailLogin"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          fullWidth
          id="passwordLogin"
          label="Senha"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <Button type="submit" variant="outlined" className="button">
          Entrar
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
