const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// "Banco de dados" simples em memória (para teste)
let users = {};

// Cadastro de usuário
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Dados incompletos" });

  const userFormatted =
    username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

  if (users[userFormatted]) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  const hash = bcrypt.hashSync(password, 10);
  users[userFormatted] = hash;

  res.json({ message: "Usuário criado com sucesso!" });
});

// Login de usuário
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const userFormatted =
    username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  const storedHash = users[userFormatted];

  if (!storedHash)
    return res.status(404).json({ error: "Usuário não encontrado" });

  const isValid = bcrypt.compareSync(password, storedHash);
  if (isValid) {
    res.json({ message: "Login bem-sucedido!" });
  } else {
    res.status(401).json({ error: "Senha incorreta" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
