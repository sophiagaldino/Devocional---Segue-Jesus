import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// --- Configurações iniciais ---
const app = express();
// Necessário para rodar no Vercel com ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Conexão com o MongoDB Atlas ---
const MONGO_URI =
  "mongodb+srv://admin:Devocional2025%21@clusterdevocional.qsfcyu1.mongodb.net/devocional?retryWrites=true&w=majority&appName=ClusterDevocional";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
  .catch((err) => console.error("❌ Erro ao conectar no MongoDB:", err));

// --- Modelo de Usuário ---
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// --- Rotas ---
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Dados incompletos." });

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(409).json({ error: "Usuário já existe." });

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hash });
    await newUser.save();

    res.json({ success: true, message: "Usuário criado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Dados incompletos." });

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ error: "Usuário não encontrado." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Senha incorreta." });

    res.json({ success: true, message: "Login bem-sucedido!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao efetuar login." });
  }
});

// --- Servir o front-end ---
app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// --- Inicializar servidor ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
