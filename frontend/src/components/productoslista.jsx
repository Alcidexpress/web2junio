import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function ProductosLista() {
  const [productos, setProductos] = useState([]);
  const [error, setError]         = useState('');
  const navigate = useNavigate();

  const fetchProductos = async () => {
    setError('');
    try {
      const response = await api.get('/productos');
      setProductos(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate('/login');
      } else {
        setError('No se pudo cargar la lista de productos');
      }
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) {
      return;
    }
    try {
      await api.delete(`/productos/${id}`);
      fetchProductos();
    } catch (err) {
      setError('Error al eliminar el producto');
    }
  };

  return (
    <div className="container">
      <h2>Lista de Productos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Link to="/productos/nuevo">
        <button>Crear nuevo</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.nombre}</td>
              <td>{prod.precio}</td>
              <td>{prod.stock}</td>
              <td>
                <Link to={`/productos/editar/${prod.id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleEliminar(prod.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
