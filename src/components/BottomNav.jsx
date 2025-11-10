import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Book,
  BookOpen,
  MessageSquare,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const link = (path, Icon) => (
    <button
      onClick={() => navigate(path)}
      className={`text-[#1E3A8A] transition ${
        location.pathname === path
          ? "bg-[#1E3A8A] text-white rounded-full p-2"
          : ""
      }`}
    >
      <Icon size={22} />
    </button>
  );

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around bg-[#ebfbf3] border-t border-blue-200 py-3 shadow-md">
      {link("/", Book)}
      {link("/leitura-livre", BookOpen)}
      {link("/mural", MessageSquare)}
      {link("/estatisticas", BarChart2)}
      {link("/config", Settings)}
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
  );
}
