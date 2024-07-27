import { createContext, useEffect, useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./components/NotFound";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { baseUrl } from "./shared";

export const LoginContext = createContext();

function App() {
  useEffect(() => {
    function refreshTokens() {
      if (localStorage.refresh) {
        const url = baseUrl + "api/token/refresh/";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: localStorage.refresh,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            localStorage.access = data.access;
            localStorage.refresh = data.refresh;
            setLoggedIn(true);
          });
      }
    }

    refreshTokens();
    setInterval(refreshTokens, 60 * 1000 * 3); // 3min
  }, []);

  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/employees" element={<Employees />}></Route>
            <Route path="/dictionary" element={<Dictionary />}></Route>
            <Route path="/dictionary/:search" element={<Definition />}></Route>
            <Route path="/customers" element={<Customers />}></Route>
            <Route path="/customers/:id" element={<Customer />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/404" element={<NotFound />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
