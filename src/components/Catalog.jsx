import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './catalog.css';

function Catalog() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => setItems(res.data))
      .catch(() => setError('No se pudieron cargar los productos.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="msg">Cargando...</p>;
  if (error) return <p className="msg error">{error}</p>;

  return (
    <div className="catalog-container">
      <h1>Tienda</h1>
      <div className="item-list">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.title} />
            <h2>{item.title}</h2>
            <span>${item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
