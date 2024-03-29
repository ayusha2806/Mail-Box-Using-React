import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import SignUp from "./componenets/SignUp";
import Login from "./componenets/Login";
import Password from "./componenets/Password";
import ComposeEmail from "./componenets/ComposeEmail";
import Inbox from "./componenets/Inbox"; 
import SentMail from "./componenets/SentMail";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password" element={<Password/>} />
        <Route path="/compose" element={<ComposeEmail />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/sent" element={<SentMail />} />
      </Routes>
    </Router>
  );
}

export default App;