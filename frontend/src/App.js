import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewBooks from "./components/ViewBooks";
import AddBooks from "./components/AddBooks";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <h1>2017 App</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/view-books" element={<ViewBooks />} />
          <Route path="/add-books" element={<AddBooks />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
