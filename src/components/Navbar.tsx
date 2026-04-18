import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, Shield } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from './ui/button'

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/settings', label: 'Settings' }
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    navigate('/login')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight" style={{ color: 'var(--color-primary)' }}>
          <Shield size={20} />
          WEIR
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: location.pathname === link.to ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                backgroundColor: location.pathname === link.to ? 'rgba(30,64,175,0.08)' : 'transparent'
              }}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2" aria-label="Log out">
            <LogOut size={16} />
            <span className="ml-1">Log out</span>
          </Button>
        </nav>

        <button
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          style={{ color: 'var(--color-text)' }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 rounded-lg text-sm font-medium"
                style={{
                  color: location.pathname === link.to ? 'var(--color-primary)' : 'var(--color-text)',
                  backgroundColor: location.pathname === link.to ? 'rgba(30,64,175,0.08)' : 'transparent'
                }}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { setMobileOpen(false); handleLogout() }}
              className="flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium text-left"
              style={{ color: 'var(--color-error)' }}
            >
              <LogOut size={16} />
              Log out
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
