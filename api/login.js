import bcrypt from "bcryptjs";

let users = {}; // mesma memória compartilhada (em produção usar DB real)

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" });

  const { username, password } = req.body;

  const userFormatted =
    username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  const storedHash = users[userFormatted];

  if (!storedHash)
    return res.status(404).json({ error: "Usuário não encontrado" });

  const isValid = bcrypt.compareSync(password, storedHash);

  if (isValid) {
    res.status(200).json({ message: "Login bem-sucedido!" });
  } else {
    res.status(401).json({ error: "Senha incorreta" });
  }
}
