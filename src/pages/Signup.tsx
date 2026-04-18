import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
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
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } }
    })
    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-dvh flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="text-center max-w-sm">
          <CheckCircle size={48} className="mx-auto mb-4" style={{ color: 'var(--color-success)' }} />
          <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Check your email</h1>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>We sent a confirmation link to {email}. Click it to activate your account.</p>
          <Button asChild variant="outline">
            <Link to="/login">Go to login</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <Link to="/" className="block text-center text-2xl font-bold mb-8" style={{ color: 'var(--color-primary)' }}>WEIR</Link>
        <div className="p-8 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>Create your account</h1>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>Start protecting your NIL in minutes.</p>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <Label htmlFor="displayName">Your name</Label>
              <Input id="displayName" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Alex Rivera" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8+ characters" required autoComplete="new-password" minLength={8} className="mt-1" />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm p-3 rounded-lg" style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)' }}>
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
              {loading ? 'Creating account...' : 'Start free'}
            </Button>
          </form>
        </div>
        <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold" style={{ color: 'var(--color-primary)' }}>Log in</Link>
        </p>
      </div>
    </div>
  )
}