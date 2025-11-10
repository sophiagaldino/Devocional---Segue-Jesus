// src/pages/Mural.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Book,
  BookOpen,
  MessageSquare,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

export default function Mural() {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const currentUser = localStorage.getItem("user") || sessionStorage.getItem("user") || "Guest";

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("muralMessages")) || [];
    setMessages(saved);
  }, []);

  const saveMessages = (updated) => {
    setMessages(updated);
    localStorage.setItem("muralMessages", JSON.stringify(updated));
  };

  const handleSend = () => {
    if (!text.trim()) return;

    if (editingIndex !== null) {
      const updated = [...messages];
      updated[editingIndex].text = text;
      updated[editingIndex].edited = true;
      saveMessages(updated);
      setEditingIndex(null);
    } else {
      const newMessage = {
        user: currentUser,
        text,
        date: new Date().toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        }),
        reactions: {},
      };
      saveMessages([...messages, newMessage]);
    }

    setText("");
  };

  const handleEdit = (index) => {
    setText(messages[index].text);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (confirm("Tem certeza que deseja excluir esta reflexão?")) {
      saveMessages(messages.filter((_, i) => i !== index));
    }
  };

  const handleReaction = (index, emoji) => {
    const updated = [...messages];
    const msg = updated[index];
    const userReactions = msg.reactions || {};

    if (!userReactions[emoji]) userReactions[emoji] = [];
    if (userReactions[emoji].includes(currentUser)) {
      userReactions[emoji] = userReactions[emoji].filter(
        (u) => u !== currentUser
      );
    } else {
      userReactions[emoji].push(currentUser);
    }

    msg.reactions = userReactions;
    saveMessages(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  const isAdmin = currentUser === "Sophia";

  return (
    <div className="min-h-screen flex flex-col bg-[#1E3A8A] text-[#ebfbf3] pb-16">
      <main className="flex-1 p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">📝 Mural de Reflexões</h2>

        {/* Campo de escrita */}
        <div className="bg-[#ebfbf3] text-[#1E3A8A] rounded-lg shadow p-4 mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Compartilhe o que entendeu da Palavra hoje..."
            className="w-full border border-blue-200 rounded-lg p-3 h-24 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <div className="flex justify-between mt-3">
            <div className="flex gap-2">
              <button
                onClick={handleSend}
                className="bg-[#1E3A8A] text-[#ebfbf3] px-4 py-2 rounded-lg hover:bg-blue-900 transition-all font-medium"
              >
                {editingIndex !== null ? "Salvar alterações" : "Enviar"}
              </button>
            </div>

            {editingIndex !== null && (
              <button
                onClick={() => {
                  setEditingIndex(null);
                  setText("");
                }}
                className="text-blue-200 text-sm hover:underline"
              >
                Cancelar edição
              </button>
            )}
          </div>
        </div>

        {/* Lista de mensagens */}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-blue-100 text-center">
              Nenhuma reflexão ainda 💭
            </p>
          ) : (
            messages.map((m, i) => {
              const totalCurtidas = Object.values(m.reactions || {}).reduce(
                (sum, arr) => sum + arr.length,
                0
              );

              return (
                <div
                  key={i}
                  className={`p-4 rounded-lg shadow transition ${
                    m.user === currentUser
                      ? "bg-[#ebfbf3] text-[#1E3A8A]"
                      : "bg-white/80 text-[#1E3A8A]"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <strong>{m.user}</strong>
                    <span className="text-xs text-blue-600">
                      {m.date} {m.edited && "· editado"}
                    </span>
                  </div>

                  <p className="whitespace-pre-line mb-3">{m.text}</p>

                  {/* Reações */}
                  <div className="flex items-center gap-3 text-lg mb-2">
                    {["❤️", "🙏", "💡"].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(i, emoji)}
                        className={`transition transform hover:scale-110 ${
                          m.reactions?.[emoji]?.includes(currentUser)
                            ? "opacity-100"
                            : "opacity-50"
                        }`}
                      >
                        {emoji}{" "}
                        {m.reactions?.[emoji]?.length > 0 && (
                          <span className="text-sm text-blue-700">
                            {m.reactions[emoji].length}
                          </span>
                        )}
                      </button>
                    ))}
                    {totalCurtidas > 0 && (
                      <span className="text-sm text-blue-800 font-medium ml-2">
                        ❤️ {totalCurtidas} curtida
                        {totalCurtidas > 1 && "s"}
                      </span>
                    )}
                  </div>

                  {/* Botões de edição/exclusão */}
                  <div className="flex gap-3 text-sm">
                    {m.user === currentUser && (
                      <button
                        onClick={() => handleEdit(i)}
                        className="text-blue-700 hover:underline"
                      >
                        Editar
                      </button>
                    )}
                    {(m.user === currentUser || isAdmin) && (
                      <button
                        onClick={() => handleDelete(i)}
                        className="text-red-600 hover:underline"
                      >
                        Excluir
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Navegação inferior */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around bg-[#ebfbf3] border-t border-blue-200 py-3 shadow-md">
        <button
          onClick={() => navigate("/")}
          className={`text-[#1E3A8A] ${
            location.pathname === "/"
              ? "bg-[#1E3A8A] text-white rounded-full p-2"
              : ""
          }`}
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
        >
          <Settings size={22} />
        </button>

        <button onClick={handleLogout} className="text-[#1E3A8A]">
          <LogOut size={22} />
        </button>
      </nav>
    </div>
  );
}
