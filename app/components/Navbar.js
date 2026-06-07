import '../styles/navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        iPekosol Business Hub
      </div>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/portfolio">Portfolio</a></li>
        <li><a href="/marketplace">Marketplace</a></li>
        <li><a href="/testimonials">Testimonials</a></li>
        <li><a href="/dashboard">Admin</a></li>

      </ul>
    </nav>
  )
}