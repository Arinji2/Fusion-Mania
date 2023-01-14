import { useState } from "react";
import Landing from "./pages/landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Create from "./pages/auth/create";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create" element={<Create />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
