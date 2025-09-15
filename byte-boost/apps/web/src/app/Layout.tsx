import { Outlet, NavLink } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="page">
      <nav className="nav">
        <div className="brand">FBLA Coding & Programming</div>
        <div className="links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/items">Items</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>
      <main className="content">
        <Outlet />
      </main>
      <footer className="muted">Built with React + Vite + pnpm</footer>
    </div>
  )
}
