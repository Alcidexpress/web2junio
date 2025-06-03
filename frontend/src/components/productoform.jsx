import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function ProductoForm() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // si hay ID, estamos editando

  useEffect(() => {
    if (id) {
      api.get(`/productos/${id}`)
        .then(res => {
          setNombre(res.data.nombre);
          setPrecio(res.data.precio);
        })
        .catch(() => setError('No se pudo cargar el producto'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/productos/${id}`, { nombre, precio });
      } else {
        await api.post('/productos', { nombre, precio });
      }
      navigate('/productos');
    } catch {
      setError('Error al guardar producto');
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
            required
          />
        </div>
        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
}
