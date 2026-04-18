import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t py-10" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>WEIR</p>
        <nav className="flex items-center gap-6">
          <Link to="/pricing" className="text-sm hover:opacity-80 transition-opacity" style={{ color: 'var(--color-text-secondary)' }}>Pricing</Link>
          <a href="mailto:support@weir.app" className="text-sm hover:opacity-80 transition-opacity" style={{ color: 'var(--color-text-secondary)' }}>Support</a>
          <Link to="/login" className="text-sm hover:opacity-80 transition-opacity" style={{ color: 'var(--color-text-secondary)' }}>Log in</Link>
        </nav>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          &copy; {year} WEIR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
