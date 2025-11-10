import { users } from "./users";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" });

  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Dados incompletos" });

  const userFormatted =
    username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

  if (users[userFormatted])
    return res.status(400).json({ error: "Usuário já existe" });

  const hash = bcrypt.hashSync(password, 10);
  users[userFormatted] = hash;

  res.status(200).json({ message: "Usuário criado com sucesso!" });
}
