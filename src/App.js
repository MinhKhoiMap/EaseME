import React from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import Survey from "./pages/Survey/Survey";

import { Routes, Route, Outlet } from "react-router-dom";
import NotePage from "./pages/NotePage/NotePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/note" element={<NotePage />} />
      </Routes>
    </div>
  );
}

export default App;
