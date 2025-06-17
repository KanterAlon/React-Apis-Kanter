import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './store.css';

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

  if (loading) return <p className="message">Cargando...</p>;
  if (error) return <p className="message error">{error}</p>;

  return (
    <main className="shop">
      <h1 className="title">Tienda</h1>
      <section className="products">
        {items.map(item => (
          <article key={item.id} className="card">
            <div className="image-wrapper">
              <img src={item.image} alt={item.title} />
            </div>
            <p className="name">{item.title}</p>
            <p className="price">${item.price}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Catalog;
