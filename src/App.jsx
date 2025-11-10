// import React from "react";
// import AppContent from "./pages/AppContent.jsx";
// import Login from "./pages/Login.jsx";

// export default function App() {
//   const loggedIn =
//     localStorage.getItem("loggedIn") || sessionStorage.getItem("loggedIn");

//   return loggedIn ? <AppContent /> : <Login />;
// }
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppContent from "./pages/AppContent.jsx";
import Login from "./pages/Login.jsx";
import SetupPassword from "./pages/SetupPassword";
import LeituraLivre from "./pages/LeituraLivre";



export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") || sessionStorage.getItem("loggedIn")
  );

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLogin={() => setLoggedIn(true)} />}
      />
      <Route
        path="/*"
        element={loggedIn ? <AppContent /> : <Navigate to="/login" />}
      />{" "}
      <Route path="/leitura-livre" element={<LeituraLivre />} />
      <Route path="/setup-password" element={<SetupPassword />} />
    </Routes>
  );
}
