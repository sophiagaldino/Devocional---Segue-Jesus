// src/pages/Leitura.jsx
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
import { plan as initialPlan } from "../services/plan";

export default function Leitura({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [plan, setPlan] = useState(
    () => JSON.parse(localStorage.getItem(user)) || initialPlan
  );
  const [currentChapterIndex, setCurrentChapterIndex] = useState(
    plan.findIndex((c) => !c.read) || 0
  );
  const [verses, setVerses] = useState([]);
  const chapter = plan[currentChapterIndex];

  useEffect(() => {
    async function loadChapter() {
      const res = await fetch(
        `https://bible-api.com/${chapter.book}+${chapter.chapterNumber}?translation=almeida`
      );
      const data = await res.json();
      setVerses(data.verses || []);
    }
    loadChapter();
  }, [currentChapterIndex, chapter.book, chapter.chapterNumber]);

  const markAsRead = () => {
    const updatedPlan = [...plan];
    updatedPlan[currentChapterIndex].read = true;
    updatedPlan[currentChapterIndex].dateRead = new Date().toISOString();
    setPlan(updatedPlan);
    localStorage.setItem(user, JSON.stringify(updatedPlan));

    const nextIndex = updatedPlan.findIndex((c) => !c.read);
    if (nextIndex !== -1) setCurrentChapterIndex(nextIndex);
  };

  const handleNav = (path) => {
    setTimeout(() => navigate(path), 80);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ebfbf3] text-[#1E3A8A] pb-16">
      <main className="flex-1 p-6 max-w-2xl mx-auto space-y-6">
        {/* Capítulo atual */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          <h2 className="text-2xl font-bold mb-4 text-[#1E3A8A]">
            {chapter.book} {chapter.chapterNumber}
          </h2>

          <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-2">
            {verses.map((v) => (
              <p key={v.verse} className="text-[#1E3A8A]/90 leading-relaxed">
                <strong className="text-[#1E3A8A]">{v.verse}.</strong> {v.text}
              </p>
            ))}
          </div>

          <button
            onClick={markAsRead}
            className="mt-5 w-full bg-[#1E3A8A] hover:bg-blue-900 text-white font-semibold py-2 rounded-xl transition-all"
          >
            ✅ Marcar como lido
          </button>
        </div>

        {/* Lista de capítulos */}
        <div className="bg-white rounded-2xl shadow-lg p-4 border border-blue-100">
          <h3 className="font-bold mb-3 text-[#1E3A8A] text-lg">
            📖 Plano de leitura
          </h3>

          <div className="flex flex-wrap gap-2 max-h-[35vh] overflow-y-auto">
            {plan.map((c, i) => (
              <button
                key={c.id}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  c.read
                    ? "bg-blue-100 text-[#1E3A8A] border border-blue-200"
                    : "bg-[#ebfbf3] border border-blue-200 hover:bg-blue-50"
                }`}
                onClick={() => setCurrentChapterIndex(i)}
              >
                {c.book} {c.chapterNumber}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Navegação inferior igual à LeituraLivre */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around bg-[#ebfbf3] border-t border-blue-200 py-3 shadow-md">
        <button
          onClick={() => handleNav("/")}
          className={`text-[#1E3A8A] ${
            location.pathname === "/"
              ? "bg-[#1E3A8A] text-white rounded-full p-2"
              : ""
          }`}
        >
          <Book size={22} />
        </button>

        <button
          onClick={() => handleNav("/leitura-livre")}
          className={`text-[#1E3A8A] ${
            location.pathname === "/leitura-livre"
              ? "bg-[#1E3A8A] text-white rounded-full p-2"
              : ""
          }`}
        >
          <BookOpen size={22} />
        </button>

        <button
          onClick={() => handleNav("/mural")}
          className={`text-[#1E3A8A] ${
            location.pathname === "/mural"
              ? "bg-[#1E3A8A] text-white rounded-full p-2"
              : ""
          }`}
        >
          <MessageSquare size={22} />
        </button>

        <button
          onClick={() => handleNav("/estatisticas")}
          className={`text-[#1E3A8A] ${
            location.pathname === "/estatisticas"
              ? "bg-[#1E3A8A] text-white rounded-full p-2"
              : ""
          }`}
        >
          <BarChart2 size={22} />
        </button>

        <button
          onClick={() => handleNav("/config")}
          className={`text-[#1E3A8A] ${
            location.pathname === "/config"
              ? "bg-[#1E3A8A] text-white rounded-full p-2"
              : ""
          }`}
        >
          <Settings size={22} />
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
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
