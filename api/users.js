// /api/users.js
import bcrypt from "bcryptjs";

// Usuários iniciais (seed) – só para teste
let users = {
  Sophia: bcrypt.hashSync("solsol", 10), // usuário admin inicial
};

export { users };
