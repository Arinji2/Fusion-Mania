import { useState } from "react";
import Landing from "./pages/landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Create from "./pages/auth/create";
import Verify from "./pages/auth/verify";
import Forgot from "./pages/auth/forgot";
import Name from "./pages/setup/name";
import Choose from "./pages/setup/choose";
import Nick from "./pages/setup/nick";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/forgot" element={<Forgot />}></Route>
          <Route path="/setup/name" element={<Name />}></Route>
          <Route path="/setup/choose" element={<Choose />}></Route>
          <Route path="/setup/nick" element={<Nick />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
