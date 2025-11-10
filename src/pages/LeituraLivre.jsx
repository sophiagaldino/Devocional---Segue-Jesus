// src/pages/LeituraLivre.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Book,
  BookOpen,
  MessageSquare,
  BarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const livrosBiblia = [
  "Gênesis",
  "Êxodo",
  "Levítico",
  "Números",
  "Deuteronômio",
  "Josué",
  "Juízes",
  "Rute",
  "1 Samuel",
  "2 Samuel",
  "1 Reis",
  "2 Reis",
  "1 Crônicas",
  "2 Crônicas",
  "Esdras",
  "Neemias",
  "Ester",
  "Jó",
  "Salmos",
  "Provérbios",
  "Eclesiastes",
  "Cânticos",
  "Isaías",
  "Jeremias",
  "Lamentações",
  "Ezequiel",
  "Daniel",
  "Oseias",
  "Joel",
  "Amós",
  "Obadias",
  "Jonas",
  "Miquéias",
  "Naum",
  "Habacuque",
  "Sofonias",
  "Ageu",
  "Zacarias",
  "Malaquias",
  "Mateus",
  "Marcos",
  "Lucas",
  "João",
  "Atos",
  "Romanos",
  "1 Coríntios",
  "2 Coríntios",
  "Gálatas",
  "Efésios",
  "Filipenses",
  "Colossenses",
  "1 Tessalonicenses",
  "2 Tessalonicenses",
  "1 Timóteo",
  "2 Timóteo",
  "Tito",
  "Filemom",
  "Hebreus",
  "Tiago",
  "1 Pedro",
  "2 Pedro",
  "1 João",
  "2 João",
  "3 João",
  "Judas",
  "Apocalipse",
];

const capitulosPorLivro = {
  Gênesis: 50,
  Êxodo: 40,
  Levítico: 27,
  Números: 36,
  Deuteronômio: 34,
  Josué: 24,
  Juízes: 21,
  Rute: 4,
  "1 Samuel": 31,
  "2 Samuel": 24,
  "1 Reis": 22,
  "2 Reis": 25,
  "1 Crônicas": 29,
  "2 Crônicas": 36,
  Esdras: 10,
  Neemias: 13,
  Ester: 10,
  Jó: 42,
  Salmos: 150,
  Provérbios: 31,
  Eclesiastes: 12,
  Cânticos: 8,
  Isaías: 66,
  Jeremias: 52,
  Lamentações: 5,
  Ezequiel: 48,
  Daniel: 12,
  Oseias: 14,
  Joel: 3,
  Amós: 9,
  Obadias: 1,
  Jonas: 4,
  Miquéias: 7,
  Naum: 3,
  Habacuque: 3,
  Sofonias: 3,
  Ageu: 2,
  Zacarias: 14,
  Malaquias: 4,
  Mateus: 28,
  Marcos: 16,
  Lucas: 24,
  João: 21,
  Atos: 28,
  Romanos: 16,
  "1 Coríntios": 16,
  "2 Coríntios": 13,
  Gálatas: 6,
  Efésios: 6,
  Filipenses: 4,
  Colossenses: 4,
  "1 Tessalonicenses": 5,
  "2 Tessalonicenses": 3,
  "1 Timóteo": 6,
  "2 Timóteo": 4,
  Tito: 3,
  Filemom: 1,
  Hebreus: 13,
  Tiago: 5,
  "1 Pedro": 5,
  "2 Pedro": 3,
  "1 João": 5,
  "2 João": 1,
  "3 João": 1,
  Judas: 1,
  Apocalipse: 22,
};

export default function LeituraLivre() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");

  const [book, setBook] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!user) {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
    return null;
  }

  const loadChapter = async (b = book, c = chapterNumber) => {
    if (!b || !c) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://bible-api.com/${b}+${c}?translation=almeida`
      );
      const data = await res.json();
      setVerses(data.verses || []);
      setBook(b);
      setChapterNumber(c);
    } catch (err) {
      console.error(err);
      setVerses([]);
    }
    setLoading(false);
  };

  const nextChapter = () => {
    const total = capitulosPorLivro[book];
    if (Number(chapterNumber) < total) {
      loadChapter(book, Number(chapterNumber) + 1);
    } else {
      const nextBookIndex =
        (livrosBiblia.indexOf(book) + 1) % livrosBiblia.length;
      const nextBook = livrosBiblia[nextBookIndex];
      loadChapter(nextBook, 1);
    }
  };

  const prevChapter = () => {
    if (Number(chapterNumber) > 1) {
      loadChapter(book, Number(chapterNumber) - 1);
    } else {
      const prevBookIndex =
        (livrosBiblia.indexOf(book) - 1 + livrosBiblia.length) %
        livrosBiblia.length;
      const prevBook = livrosBiblia[prevBookIndex];
      const lastChapter = capitulosPorLivro[prevBook];
      loadChapter(prevBook, lastChapter);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ebfbf3] text-[#1E3A8A] pb-16">
      <main className="flex-1 p-6 max-w-2xl mx-auto space-y-5">
        <h2 className="text-2xl font-bold text-[#1E3A8A] text-center">
          📖 Leitura Livre
        </h2>

        {/* Seleção de livro e capítulo */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-blue-100 flex flex-wrap gap-2 items-center justify-between">
          <select
            value={book}
            onChange={(e) => setBook(e.target.value)}
            className="border border-blue-200 px-3 py-2 rounded-lg flex-1 focus:ring-2 focus:ring-blue-300 outline-none"
          >
            <option value="">Selecione o livro</option>
            {livrosBiblia.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <select
            value={chapterNumber}
            onChange={(e) => setChapterNumber(e.target.value)}
            className="border border-blue-200 px-3 py-2 w-24 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          >
            <option value="">Capítulo</option>
            {book &&
              Array.from(
                { length: capitulosPorLivro[book] },
                (_, i) => i + 1
              ).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
          </select>

          <button
            onClick={() => loadChapter()}
            className="bg-[#1E3A8A] text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-all font-semibold"
          >
            Ler
          </button>
        </div>

        {/* Navegação capítulos */}
        {verses.length > 0 && (
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={prevChapter}
              className="flex items-center gap-1 px-4 py-1 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 transition"
            >
              <ChevronLeft size={18} /> Anterior
            </button>
            <span className="font-semibold text-[#1E3A8A]">
              {book} {chapterNumber}
            </span>
            <button
              onClick={nextChapter}
              className="flex items-center gap-1 px-4 py-1 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 transition"
            >
              Próximo <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Versículos */}
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-blue-100 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <p className="text-blue-500 text-center">Carregando...</p>
          ) : verses.length === 0 ? (
            <p className="text-blue-400 text-center">
              Nenhum versículo carregado
            </p>
          ) : (
            verses.map((v) => (
              <p
                key={v.verse}
                className="text-[#1E3A8A]/90 mb-2 leading-relaxed"
              >
                <strong className="text-[#1E3A8A]">{v.verse}.</strong> {v.text}
              </p>
            ))
          )}
        </div>
      </main>

      {/* Navegação inferior atualizada */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around bg-[#ebfbf3] border-t border-blue-200 py-3 shadow-md">
        <button onClick={() => navigate("/")} className="text-[#1E3A8A]">
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
