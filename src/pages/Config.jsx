// src/pages/Config.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Book,
  BookOpen,
  MessageSquare,
  BarChart2,
  Settings as SettingsIcon,
  Settings,
  LogOut,
  UserPlus,
  Trash2,
  RefreshCw,
  Edit,
  Save,
} from "lucide-react";

export default function Config() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  const [credentials, setCredentials] = useState({});
  const [newUser, setNewUser] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(currentUser || "");

  // 🔄 Carrega usuários salvos
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("credentials") || "{}");
    setCredentials(stored);
  }, []);

  // 💾 Atualiza o localStorage
  const saveCredentials = (updated) => {
    setCredentials(updated);
    localStorage.setItem("credentials", JSON.stringify(updated));
  };

  // 👑 --- ÁREA DO ADMIN (Sophia) ---
  const handleAddUser = () => {
    if (!newUser.trim()) return alert("Digite um nome para criar o usuário.");
    const formatted =
      newUser.charAt(0).toUpperCase() + newUser.slice(1).toLowerCase();

    if (credentials[formatted] !== undefined)
      return alert("Usuário já existe.");

    const updated = { ...credentials, [formatted]: null };
    saveCredentials(updated);
    setNewUser("");
    alert(`Usuário ${formatted} criado com sucesso!`);
  };

  const handleDeleteUser = (user) => {
    if (!confirm(`Excluir o usuário ${user}?`)) return;
    const updated = { ...credentials };
    delete updated[user];
    saveCredentials(updated);
    localStorage.removeItem(user);
    alert(`Usuário ${user} foi removido.`);
  };

  const handleResetPassword = (user) => {
    if (!confirm(`Resetar a senha de ${user}?`)) return;
    const updated = { ...credentials, [user]: null };
    saveCredentials(updated);
    alert(`Senha de ${user} resetada!`);
  };

  // 👤 --- ÁREA DO USUÁRIO COMUM ---
  const handleEditName = () => setEditingName(true);

  const handleSaveName = () => {
    if (!newName.trim()) return alert("O nome não pode estar vazio.");
    const formatted =
      newName.charAt(0).toUpperCase() + newName.slice(1).toLowerCase();

    const updated = { ...credentials };
    const oldData = updated[currentUser];
    delete updated[currentUser];
    updated[formatted] = oldData;
    saveCredentials(updated);

    const planData = localStorage.getItem(currentUser);
    if (planData) {
      localStorage.setItem(formatted, planData);
      localStorage.removeItem(currentUser);
    }

    localStorage.setItem("user", formatted);
    sessionStorage.setItem("user", formatted);

    alert("Nome atualizado com sucesso!");
    setEditingName(false);
    window.location.reload();
  };

  const handleResetPlan = () => {
    if (!confirm("Tem certeza que deseja resetar seu plano de leitura?"))
      return;
    localStorage.removeItem(currentUser);
    alert("Seu plano foi resetado!");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  const isAdmin = currentUser === "Sophia";

  return (
    <div className="min-h-screen flex flex-col bg-[#1E3A8A] text-[#EBFBF3] pb-16">
      <main className="flex-1 p-6 max-w-md mx-auto w-full">
        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <SettingsIcon size={24} className="text-[#EBFBF3]" />
          Configurações
        </h2>

        {isAdmin ? (
          // 👑 ADMIN VIEW
          <div className="space-y-6">
            <div className="bg-[#EBFBF3] text-[#1E3A8A] p-4 rounded-2xl shadow-md">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <UserPlus size={18} /> Gerenciar Usuários
              </h3>

              <div className="flex mb-4">
                <input
                  type="text"
                  value={newUser}
                  onChange={(e) => setNewUser(e.target.value)}
                  placeholder="Novo usuário"
                  className="flex-1 px-3 py-2 border rounded-l-lg text-sm focus:outline-none"
                />
                <button
                  onClick={handleAddUser}
                  className="bg-[#1E3A8A] text-white px-3 rounded-r-lg hover:bg-blue-900"
                >
                  <UserPlus size={18} />
                </button>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {Object.keys(credentials).length === 0 ? (
                  <p className="text-sm text-gray-600 text-center">
                    Nenhum usuário criado.
                  </p>
                ) : (
                  Object.keys(credentials).map((user) => (
                    <div
                      key={user}
                      className="flex justify-between items-center bg-blue-50 p-2 rounded-lg"
                    >
                      <span className="text-sm font-medium">{user}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleResetPassword(user)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Resetar senha"
                        >
                          <RefreshCw size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 hover:text-red-900"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          // 👤 USER VIEW
          <div className="space-y-6">
            <div className="bg-[#EBFBF3] text-[#1E3A8A] p-4 rounded-2xl shadow-md">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen size={18} /> Conta
              </h3>

              {editingName ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  />
                  <button
                    onClick={handleSaveName}
                    className="bg-green-600 text-white px-3 rounded-lg hover:bg-green-700"
                  >
                    <Save size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="font-medium">{currentUser}</p>
                  <button
                    onClick={handleEditName}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit size={18} />
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleResetPlan}
              className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Resetar Plano de Leitura
            </button>
          </div>
        )}
      </main>

      {/* 🔽 Navegação inferior igual à de Estatísticas */}
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
