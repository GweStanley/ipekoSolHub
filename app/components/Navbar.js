'use client'

import { useState } from 'react'
import '../styles/navbar.css'

export default function Navbar() {

  const [open, setOpen] = useState(false)

  return (

    <nav className="navbar">

      <div className="logo">
        iPekosol Business Hub
      </div>

      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
      >
        Menu☰
      </button>

      <ul className={`nav-links ${open ? 'active' : ''}`}>

        <li><a href="/">Home</a></li>
        <li><a href="/portfolio">Portfolio</a></li>
        <li><a href="/marketplace">Shop</a></li>
        <li><a href="/testimonials">Testimonials</a></li>
        <li><a href="/dashboard">Admin</a></li>

      </ul>

    </nav>
  )
}