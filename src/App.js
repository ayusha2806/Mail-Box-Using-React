import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import SignUp from "./componenets/SignUp";
import Login from "./componenets/Login";
import Password from "./componenets/Password";
import Welcome from "./componenets/Welcome";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password" element={<Password/>} />
        <Route path="/welcome" element={<Welcome/>} />
      </Routes>
    </Router>
  );
}

export default App;