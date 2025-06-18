import React, { useState } from 'react'
import './material.css'

function MaterialManager() {
  const [materials, setMaterials] = useState([])
  const [search, setSearch] = useState('')
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [location, setLocation] = useState('sede')

  const addMaterial = () => {
    if (!name.trim()) return
    const qty = parseInt(quantity, 10) || 0
    if (qty <= 0) return
    const existing = materials.find(
      m => m.name.toLowerCase() === name.toLowerCase() && m.location === location
    )
    if (existing) {
      setMaterials(prev =>
        prev.map(m =>
          m === existing ? { ...m, quantity: m.quantity + qty } : m
        )
      )
    } else {
      setMaterials(prev => [
        ...prev,
        { id: Date.now(), name, quantity: qty, location },
      ])
    }
    setName('')
    setQuantity(1)
  }

  const increase = id => {
    const amount = parseInt(prompt('Cantidad a agregar', '1'), 10)
    if (!amount || amount <= 0) return
    setMaterials(prev =>
      prev.map(m => (m.id === id ? { ...m, quantity: m.quantity + amount } : m))
    )
  }

  const filtered = materials.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="materials-container">
      <h2 className="materials-header">Materiales</h2>
      <div className="material-form">
        <input
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
        <select value={location} onChange={e => setLocation(e.target.value)}>
          <option value="sede">Retirar en sede</option>
          <option value="envio">Envío</option>
        </select>
        <button onClick={addMaterial}>Agregar</button>
      </div>
      <input
        className="search-input"
        placeholder="Buscar material"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul className="materials-list">
        {filtered.map(m => (
          <li key={m.id} className="material-item">
            <span>
              {m.name} - {m.quantity} ({m.location})
            </span>
            <button onClick={() => increase(m.id)}>+</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MaterialManager
