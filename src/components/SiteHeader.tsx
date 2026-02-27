import { ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/#services', label: 'Services' },
  { to: '/#about', label: 'About Us' },
  { to: '/#faq', label: 'FAQ' },
  { to: '/#contact', label: 'Contact Us' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [showServices, setShowServices] = useState(false)

  return (
    <header className="header-wrap">
      <div className="announcement">Trusted by 500K+ customers for secure, modern banking.</div>
      <nav className="container nav">
        <Link to="/" className="brand">
          <img src="/logo.svg" alt="NovexTrustPay logo" />
        </Link>
        <button className="mobile-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <a key={link.label} href={link.to} onClick={() => setOpen(false)}>{link.label}</a>
          ))}
          <div
            className="services-popover"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <button type="button" className="services-trigger">
              Services <ChevronDown size={16} />
            </button>
            {showServices && (
              <div className="services-menu">
                <a href="/#services">Personal Banking</a>
                <a href="/#services">Business Banking</a>
                <a href="/#services">Investments</a>
                <a href="/#services">Insurance</a>
                <a href="/#services">Mortgages</a>
              </div>
            )}
          </div>
        </div>

        <div className={`nav-actions ${open ? 'open' : ''}`}>
          <NavLink to="/login" className="btn ghost" onClick={() => setOpen(false)}>Login</NavLink>
          <NavLink to="/register" className="btn solid" onClick={() => setOpen(false)}>Open Account</NavLink>
        </div>
      </nav>
    </header>
  )
}
