// https://www.techiediaries.com/fake-api-jwt-json-server/

const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const session = require("express-session");

const server = jsonServer.create();

const router = jsonServer.router("./db.json");
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const SECRET_KEY = "aFuhVas87asd62kjsDf";
server.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false /*, cookie: {maxAge: 5000}*/,
  })
);

function findUser({ email, password }) {
  return userdb.users.find(
    (user) => user.email === email && user.password === password
  );
}

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = findUser({ email, password });
  if (!user) {
    const status = 401;
    res
      .status(status)
      .json({ status, message: "E-mail não encontrado ou password incorreta" });
  } else {
    req.session.user = { name: user.name, email: user.email };
    res.status(200).json(req.session.user);
  }
});

server.get("/auth/user", (req, res) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ status: 401, message: "Não autenticado" });
  }
});

server.post("/auth/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy(function (err) {
      res.status(200).json({ message: "Você saiu do sistema" });
    });
  } else {
    res.status(401).json({ status: 401, message: "Não autenticado" });
  }
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (!req.session.user) {
    const status = 401;
    res.status(status).json({ status, message: "Não autenticado" });
    return;
  } else {
    next();
  }
});

server.use(router);

server.listen(3001, () => {
  console.log(`Servidor inicializado`);
});
