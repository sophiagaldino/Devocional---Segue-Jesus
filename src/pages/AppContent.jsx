import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Book, MessageSquare, BarChart2, Settings, LogOut } from "lucide-react";

import Leitura from "./Leitura.jsx";
import LeituraLivre from "./LeituraLivre.jsx";
import Mural from "./Mural.jsx";
import Estatisticas from "./Estatisticas.jsx";
import Config from "./Config.jsx";

export default function AppContent() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("user");
      sessionStorage.removeItem("loggedIn");
      sessionStorage.removeItem("user");
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#EBFBF3] to-white text-[#1E3A8A]">
      {/* Header */}
      <header className="bg-[#EBFBF3] shadow-md p-4 flex justify-between items-center border-b border-[#1E3A8A]/20">
        <h2 className="font-semibold text-[#1E3A8A]">Bem-vindo(a), {user}</h2>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Leitura user={user} />} />
          <Route path="/leitura-livre" element={<LeituraLivre />} />
          <Route path="/mural" element={<Mural />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      </main>

      {/* Navegação inferior */}
      <nav className="flex justify-around bg-[#EBFBF3] shadow-md py-3 border-t border-[#1E3A8A]/20">
        <button onClick={() => navigate("/")} className="text-[#1E3A8A]">
          <Book size={22} />
        </button>
        <button
          onClick={() => navigate("/leitura-livre")}
          className="text-[#1E3A8A]"
        >
          📖
        </button>
        <button onClick={() => navigate("/mural")} className="text-[#1E3A8A]">
          <MessageSquare size={22} />
        </button>
        <button
          onClick={() => navigate("/estatisticas")}
          className="text-[#1E3A8A]"
        >
          <BarChart2 size={22} />
        </button>
        <button onClick={() => navigate("/config")} className="text-[#1E3A8A]">
          <Settings size={22} />
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("user");
            sessionStorage.removeItem("loggedIn");
            sessionStorage.removeItem("user");
            navigate("/login", { replace: true });
          }}
          className="text-[#1E3A8A]"
        >
          <LogOut size={22} />
        </button>
      </nav>
    </div>
  );
}
