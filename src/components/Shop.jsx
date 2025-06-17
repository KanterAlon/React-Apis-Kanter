import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './shop.css'

function Shop() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(res => setItems(res.data))
      .catch(() => setError('No se pudieron cargar los productos.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="info-message">Cargando...</p>
  if (error) return <p className="info-message error">{error}</p>

  return (
    <div className="store-container">
      <h1 className="store-header">Catálogo</h1>
      <ul className="product-list">
        {items.map(item => (
          <li key={item.id} className="product-item">
            <img src={item.image} alt={item.title} />
            <h2 className="product-name">{item.title}</h2>
            <span className="product-price">${item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Shop