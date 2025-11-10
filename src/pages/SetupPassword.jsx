// src/pages/SetupPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import bcrypt from "bcryptjs";

export default function SetupPassword() {
  const navigate = useNavigate();
  const pendingUser = localStorage.getItem("pendingSetupUser");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  if (!pendingUser) {
    navigate("/login");
    return null;
  }

  const handleSave = async (e) => {
    e.preventDefault();

    if (password.length < 4)
      return setError("A senha deve ter pelo menos 4 caracteres.");
    if (password !== confirm) return setError("As senhas não coincidem.");

    // gerar salt + hash (work factor 10)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const creds = JSON.parse(localStorage.getItem("credentials") || "{}");
    creds[pendingUser] = hash; // salva o hash (não a senha)
    localStorage.setItem("credentials", JSON.stringify(creds));

    localStorage.removeItem("pendingSetupUser");
    alert("Senha criada com sucesso! Agora você já pode entrar.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 text-gray-800">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 text-center border border-amber-100">
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 p-3 rounded-full">
            <LockKeyhole className="text-orange-500" size={28} />
          </div>
        </div>

        <h1 className="text-xl font-semibold mb-2">
          Criar senha para {pendingUser}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Defina sua senha para acessar o devocional
        </p>

        <form onSubmit={handleSave}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nova senha"
            className="w-full px-4 py-2 border rounded-lg mb-3"
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirmar senha"
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg"
          >
            Salvar senha
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
}
