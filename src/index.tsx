import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import NavBar from "./components/navBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
