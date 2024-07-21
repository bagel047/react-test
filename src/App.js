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

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/employees" element={<Employees />}></Route>
          <Route path="/dictionary" element={<Dictionary />}></Route>
          <Route path="/dictionary/:search" element={<Definition />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/customers/:id" element={<Customer />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/404" element={<NotFound />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
