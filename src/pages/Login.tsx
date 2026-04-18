import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, Loader2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    if (!isSupabaseConfigured) {
      setTimeout(() => {
        setLoading(false)
        navigate('/dashboard')
      }, 800)
      return
    }
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError('Invalid email or password. Please try again.')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <Link to="/" className="block text-center text-2xl font-bold mb-8" style={{ color: 'var(--color-primary)' }}>WEIR</Link>
        <div className="p-8 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Welcome back</h1>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>Log in to your WEIR dashboard.</p>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required autoComplete="current-password" className="mt-1" />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm p-3 rounded-lg" style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)' }}>
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
              {loading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
        </div>
        <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-secondary)' }}>
          No account?{' '}
          <Link to="/signup" className="font-semibold" style={{ color: 'var(--color-primary)' }}>Sign up free</Link>
        </p>
      </div>
    </div>
  )
}