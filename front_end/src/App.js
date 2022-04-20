import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//==================== Pages and Components ===================

import Home from "./Pages/home";
import Login from "./Pages/Login";
import Signup from "./Pages/signup";
import ViewUsers from "./Pages/view_users";
import EditUsers from "./Pages/edit_users";
import AddUsers from './Pages/addUser'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<ViewUsers />} />
            <Route path="/editUser/:id" element={<EditUsers />} />
            <Route path="/addUser" element={<AddUsers />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
