// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const usernameFormatted =
      username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

    try {
      const res = await fetch("/api/login", {
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

        setError("");
        onLogin?.();
        navigate("/", { replace: true });
      } else {
        setError(data.error || "Erro ao logar");
      }
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err);
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E3A8A] text-gray-800">
      <div className="bg-[#ebfbf3] p-8 rounded-2xl shadow-xl w-80 text-center border border-blue-200">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Lock className="text-[#1E3A8A]" size={28} />
          </div>
        </div>

        <h1 className="text-xl font-semibold mb-2 text-[#1E3A8A]">
          Acesso Devocional
        </h1>
        <p className="text-sm text-gray-500 mb-6">Digite usuário e senha</p>

        <form onSubmit={handleLogin}>
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
            Entrar
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
}
