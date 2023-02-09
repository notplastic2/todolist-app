import React from "react";
import { Routes, Route } from "react-router-dom"
import Create from "./pages/Create";
import List from "./pages/List";
import Update from "./pages/Update";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
