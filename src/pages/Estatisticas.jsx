import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Book,
  BookOpen,
  MessageSquare,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

export default function Estatisticas() {
  const [progressData, setProgressData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const users = Object.keys(localStorage).filter(
      (key) => key !== "muralMessages"
    );

    const data = users.map((user) => {
      try {
        const planData = JSON.parse(localStorage.getItem(user)) || [];
        const total = planData.length;
        const read = planData.filter((c) => c.read).length;
        const percentage = ((read / total) * 100).toFixed(1);
        const lastRead =
          planData
            .filter((c) => c.read)
            .sort((a, b) => new Date(b.dateRead) - new Date(a.dateRead))[0]
            ?.dateRead || null;

        let badge = "";
        if (percentage >= 75) badge = "Teólogo";
        else if (percentage >= 50) badge = "Avançado";
        else if (percentage >= 25) badge = "Intermediário";
        else badge = "Iniciante";

        return { user, read, total, percentage, lastRead, badge };
      } catch {
        return null;
      }
    });

    setProgressData(data.filter(Boolean));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1E3A8A] text-[#EBFBF3] pb-16">
      <main className="flex-1 p-6 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Progresso dos Devocionais 📊
        </h2>

        {progressData.length === 0 ? (
          <p className="text-[#EBFBF3]/80 text-center">
            Nenhum progresso registrado ainda 🙏
          </p>
        ) : (
          <div className="space-y-4">
            {progressData.map((user, i) => (
              <div
                key={i}
                className="bg-[#EBFBF3] text-[#1E3A8A] rounded-lg shadow p-4 border border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{user.user}</h3>
                    <p className="text-sm opacity-80">{user.badge}</p>
                  </div>
                  <span className="text-sm opacity-80">
                    {user.read}/{user.total} capítulos ({user.percentage}%)
                  </span>
                </div>

                <div className="w-full bg-[#EBFBF3] h-3 rounded-lg overflow-hidden mb-2 border border-[#1E3A8A]/10">
                  <div
                    className={`h-3 transition-all ${
                      user.percentage >= 75
                        ? "bg-green-600"
                        : user.percentage >= 50
                        ? "bg-blue-600"
                        : user.percentage >= 25
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                    style={{ width: `${user.percentage}%` }}
                  ></div>
                </div>

                {user.lastRead && (
                  <p className="text-xs opacity-70">
                    Última leitura:{" "}
                    {new Date(user.lastRead).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Navegação inferior */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around bg-[#EBFBF3] border-t border-blue-200 py-3 shadow-md">
        <button
          onClick={() => navigate("/")}
          className={`text-[#1E3A8A] ${
            location.pathname === "/"
              ? "bg-[#1E3A8A] text-white rounded-full p-2"
              : ""
          }`}
          aria-label="Plano de Leitura"
        >
          <Book size={22} />
        </button>

        <button
          onClick={() => navigate("/leitura-livre")}
          className={`text-[#1E3A8A] ${
            location.pathname === "/leitura-livre"
              ? "bg-[#1E3A8A] text-white rounded-full p-2"
              : ""
          }`}
          aria-label="Leitura Livre"
        >
          <BookOpen size={22} />
        </button>

        <button
          onClick={() => navigate("/mural")}
          className={`text-[#1E3A8A] ${
            location.pathname === "/mural"
              ? "bg-[#1E3A8A] text-white rounded-full p-2"
              : ""
          }`}
          aria-label="Mural"
        >
          <MessageSquare size={22} />
        </button>

        <button
          onClick={() => navigate("/estatisticas")}
          className={`text-[#1E3A8A] ${
            location.pathname === "/estatisticas"
              ? "bg-[#1E3A8A] text-white rounded-full p-2"
              : ""
          }`}
          aria-label="Estatísticas"
        >
          <BarChart2 size={22} />
        </button>

        <button
          onClick={() => navigate("/config")}
          className={`text-[#1E3A8A] ${
            location.pathname === "/config"
              ? "bg-[#1E3A8A] text-white rounded-full p-2"
              : ""
          }`}
          aria-label="Configurações"
        >
          <Settings size={22} />
        </button>

        <button
          onClick={handleLogout}
          className="text-[#1E3A8A]"
          aria-label="Sair"
        >
          <LogOut size={22} />
        </button>
      </nav>
    </div>
  );
}
