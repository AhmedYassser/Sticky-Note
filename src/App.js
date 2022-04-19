import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Componants/Home";
import Login from "./Componants/Login";
import Navbar from "./Navbar/Navbar";
import Register from "./Register/Register";

function App() {

  let login = localStorage.getItem('token');

  return (
    <>
      <Navbar />
      <Routes>
        {login ? <Route path="/home" element={<Home />} /> : ''}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
