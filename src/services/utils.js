// src/services/utils.js
export const todayKey = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

export const isAdmin = (user) => user === "Sophia";

// Exemplo de progresso salvo no localStorage
export const getProgress = () => {
  const data = JSON.parse(localStorage.getItem("progress") || "{}");
  return data;
};

export const setProgress = (user, chapter) => {
  const data = getProgress();
  if (!data[user]) data[user] = {};
  data[user][todayKey()] = chapter;
  localStorage.setItem("progress", JSON.stringify(data));
};
