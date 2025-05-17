import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from '../pages/Home';
// import About from '../pages/About';
import RegistrationForm from '../pages/Register';
import Login from '../pages/Login'

export default function AppRouter() {
  return (
      <Routes>
        <Route path="/" element={<h1>hi</h1>} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
  );
}
