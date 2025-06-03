import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import ProductosLista from './components/productoslista';
import ProductoForm from './components/productoform';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={isAuthenticated ? <ProductosLista /> : <Navigate to="/login" />} />
        <Route path="/productos/nuevo" element={isAuthenticated ? <ProductoForm /> : <Navigate to="/login" />} />
        <Route path="/productos/editar/:id" element={isAuthenticated ? <ProductoForm /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
