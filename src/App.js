import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Markdown from "./components/markdown/Markdown";
import { UserConsumer, UserContext } from "./context/UserContext";
import Admin from "./pages/Admin";

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const { isAuth, setIsAuth, user } = useContext(UserContext);

  useEffect(() => {
    if (user?.id) {
      setIsAuth(true);
    }
  }, [isAuth, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {isAuth ? <Route path="/admin" element={<Admin />} /> : null}
        {/* <Route path="/markdown" element={<Markdown />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
