// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    const usernameFormatted =
      username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameFormatted, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (remember) {
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("user", usernameFormatted);
        } else {
          sessionStorage.setItem("loggedIn", "true");
          sessionStorage.setItem("user", usernameFormatted);
        }

        setMessage("");
        navigate("/", { replace: true });
      } else {
        setMessage(data.error || "Erro ao cadastrar");
      }
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err);
      setMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E3A8A] text-gray-800">
      <div className="bg-[#ebfbf3] p-8 rounded-2xl shadow-xl w-80 text-center border border-blue-200">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <UserPlus className="text-[#1E3A8A]" size={28} />
          </div>
        </div>

        <h1 className="text-xl font-semibold mb-2 text-[#1E3A8A]">
          Cadastro Devocional
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Preencha os campos para criar sua conta
        </p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] outline-none mb-4 bg-white"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] outline-none mb-4 bg-white"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar senha"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] outline-none mb-4 bg-white"
          />

          <div className="flex items-center mb-4 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="mr-2 accent-[#1E3A8A]"
            />
            Lembrar meu acesso
          </div>

          <button
            type="submit"
            className="w-full bg-[#1E3A8A] text-white py-2 rounded-lg hover:bg-blue-900 transition-all"
          >
            Cadastrar
          </button>
        </form>

        {message && <p className="text-red-500 text-sm mt-3">{message}</p>}
      </div>
    </div>
  );
}
