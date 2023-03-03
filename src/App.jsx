import { createContext, useEffect, useState } from "react";
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
import Manage from "./pages/manage/main";
import Card from "./pages/manage/individual";

import MergeFirst from "./pages/merge/merge1";
import MergeSecond from "./pages/merge/merge2";
import Final from "./pages/merge/final";
import Success from "./pages/merge/success";
import New from "./pages/setup/new";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const authContext = createContext();

function App() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setValue(user);
    });
  }, []);

  return (
    <div>
      <authContext.Provider value={value}>
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
            <Route path="/setup/new-nick" element={<New />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/materialize" element={<Main />}></Route>
            <Route path="/materialize/confirm" element={<Confirm />}></Route>
            <Route path="/manage" element={<Manage />}></Route>
            <Route path="/manage/:id" element={<Card />}></Route>
            <Route path="/merge/first" element={<MergeFirst />}></Route>
            <Route path="/merge/second" element={<MergeSecond />}></Route>
            <Route path="/merge/final" element={<Final />}></Route>
            <Route path="/merge/success" element={<Success />}></Route>
          </Routes>
        </Router>
      </authContext.Provider>
    </div>
  );
}

export default App;
