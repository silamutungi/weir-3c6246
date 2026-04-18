import { useEffect, useState, type FormEvent } from 'react'
import { Loader2, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'
import Navbar from '../components/Navbar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function Settings() {
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      setLoading(true)
      if (!isSupabaseConfigured) {
        await new Promise((r) => setTimeout(r, 500))
        setDisplayName('Alex Rivera')
        setBio('Content creator and athlete protecting my NIL with WEIR.')
        setLoading(false)
        return
      }
      const { data: sessionData } = await supabase.auth.getSession()
      const userId = sessionData.session?.user?.id
      if (!userId) { setLoading(false); return }
      const { data } = await (supabase.from('weir_profiles').select('*').eq('user_id', userId).single() as any)
      if (data) {
        setDisplayName(data.display_name ?? '')
        setBio(data.bio ?? '')
      }
      setLoading(false)
    }
    loadProfile()
  }, [])

  async function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)
    if (!isSupabaseConfigured) {
      await new Promise((r) => setTimeout(r, 700))
      setSaving(false)
      setSuccess(true)
      return
    }
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id
    if (!userId) { setError('Session expired. Please log in again.'); setSaving(false); return }
    const { error: upsertError } = await (supabase.from('weir_profiles').upsert({ user_id: userId, display_name: displayName, bio, updated_at: new Date().toISOString() } as any) as any)
    setSaving(false)
    if (upsertError) {
      setError('Failed to save changes. Please try again.')
    } else {
      setSuccess(true)
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100dvh' }}>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Settings</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Manage your profile and account preferences.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <Label htmlFor="displayName">Display name</Label>
                    <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell brands who you are" className="mt-1" />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 text-sm p-3 rounded-lg" style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: 'var(--color-error)' }}>
                      <AlertCircle size={16} className="shrink-0" />
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="flex items-center gap-2 text-sm p-3 rounded-lg" style={{ backgroundColor: 'rgba(22,163,74,0.08)', color: 'var(--color-success)' }}>
                      <CheckCircle size={16} className="shrink-0" />
                      Changes saved successfully.
                    </div>
                  )}
                  <Button type="submit" disabled={saving}>
                    {saving ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
                    {saving ? 'Saving...' : 'Save changes'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base" style={{ color: 'var(--color-error)' }}>Danger zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl border" style={{ borderColor: 'rgba(220,38,38,0.3)', backgroundColor: 'rgba(220,38,38,0.04)' }}>
                  <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--color-error)' }} />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Delete account</p>
                    <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>This permanently removes your profile, detection history, and license data. This action cannot be undone.</p>
                    <Button variant="destructive" size="sm" type="button" onClick={() => alert('Please contact support@weir.app to complete account deletion.')}>
                      Delete account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}