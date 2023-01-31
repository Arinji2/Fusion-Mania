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
import Dashboard from "./pages/dashboard/dashboard";
import Main from "./pages/materialize/main";
import Confirm from "./pages/materialize/confirm";
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
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/materialize" element={<Main />}></Route>
          <Route path="/materialize/confirm" element={<Confirm />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
