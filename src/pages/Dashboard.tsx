import { useEffect, useState } from 'react'
import { Shield, DollarSign, AlertTriangle, Loader2, RefreshCw, TrendingUp, CheckCircle, XCircle } from 'lucide-react'

import Navbar from '../components/Navbar'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency, timeAgo } from '../lib/utils'
import type { WeirAlert } from '../types'

const SEED_ALERTS: WeirAlert[] = [
  { id: '1', user_id: 'demo', platform: 'Instagram', content_url: 'https://instagram.com/p/demo1', match_confidence: 97, status: 'pending', detected_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), resolved_at: null, earnings_amount: null, created_at: new Date().toISOString(), deleted_at: null },
  { id: '2', user_id: 'demo', platform: 'TikTok', content_url: 'https://tiktok.com/@demo/video/1', match_confidence: 91, status: 'approved', detected_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), resolved_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), earnings_amount: 450, created_at: new Date().toISOString(), deleted_at: null },
  { id: '3', user_id: 'demo', platform: 'Facebook Ads', content_url: 'https://facebook.com/ads/demo', match_confidence: 88, status: 'disputed', detected_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), resolved_at: null, earnings_amount: null, created_at: new Date().toISOString(), deleted_at: null },
  { id: '4', user_id: 'demo', platform: 'YouTube', content_url: 'https://youtube.com/watch?v=demo', match_confidence: 99, status: 'approved', detected_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), resolved_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), earnings_amount: 1200, created_at: new Date().toISOString(), deleted_at: null },
  { id: '5', user_id: 'demo', platform: 'Twitter/X', content_url: 'https://x.com/demo/status/1', match_confidence: 76, status: 'removed', detected_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), resolved_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), earnings_amount: null, created_at: new Date().toISOString(), deleted_at: null },
  { id: '6', user_id: 'demo', platform: 'Snapchat', content_url: 'https://snapchat.com/demo', match_confidence: 83, status: 'pending', detected_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), resolved_at: null, earnings_amount: null, created_at: new Date().toISOString(), deleted_at: null }
]

const statusConfig = {
  pending: { label: 'Pending', variant: 'warning' as const, icon: AlertTriangle },
  approved: { label: 'Approved', variant: 'success' as const, icon: CheckCircle },
  disputed: { label: 'Disputed', variant: 'destructive' as const, icon: XCircle },
  removed: { label: 'Removed', variant: 'secondary' as const, icon: XCircle }
}

export default function Dashboard() {
  const [alerts, setAlerts] = useState<WeirAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  async function fetchAlerts() {
    setLoading(true)
    setError(null)
    if (!isSupabaseConfigured) {
      await new Promise((r) => setTimeout(r, 600))
      setAlerts(SEED_ALERTS)
      setLoading(false)
      return
    }
    const { data, error: fetchError } = await (supabase.from('weir_alerts').select('*').is('deleted_at', null).order('detected_at', { ascending: false }) as any)
    if (fetchError) {
      setError('Failed to load alerts. Please try again.')
    } else {
      setAlerts((data as WeirAlert[]) ?? [])
    }
    setLoading(false)
  }

  useEffect(() => { fetchAlerts() }, [])

  async function updateAlertStatus(id: string, status: WeirAlert['status']) {
    setActionLoading(id)
    if (!isSupabaseConfigured) {
      await new Promise((r) => setTimeout(r, 500))
      setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, status, resolved_at: new Date().toISOString() } : a))
      setActionLoading(null)
      return
    }
    await (supabase.from('weir_alerts').update({ status, resolved_at: new Date().toISOString() } as any).eq('id', id) as any)
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, status, resolved_at: new Date().toISOString() } : a))
    setActionLoading(null)
  }

  const totalEarnings = alerts.filter((a) => a.earnings_amount).reduce((sum, a) => sum + (a.earnings_amount ?? 0), 0)
  const pendingCount = alerts.filter((a) => a.status === 'pending').length
  const approvedCount = alerts.filter((a) => a.status === 'approved').length

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100dvh' }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        {!isSupabaseConfigured && (
          <div className="mb-6 p-4 rounded-xl border text-sm flex items-center gap-3" style={{ backgroundColor: 'rgba(37,99,235,0.08)', borderColor: 'var(--color-info)', color: 'var(--color-info)' }}>
            <Shield size={16} className="shrink-0" />
            Viewing sample data — connect your database to go live.
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Monitor detections and manage your NIL rights in real time.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign size={20} style={{ color: 'var(--color-success)' }} />
                <span className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{loading ? '—' : formatCurrency(totalEarnings)}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Detections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Shield size={20} style={{ color: 'var(--color-primary)' }} />
                <span className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{loading ? '—' : alerts.length}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Pending Action</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} style={{ color: 'var(--color-warning)' }} />
                <span className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{loading ? '—' : pendingCount}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Approved Uses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp size={20} style={{ color: 'var(--color-accent)' }} />
                <span className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{loading ? '—' : approvedCount}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>Recent Detections</h2>
          <Button variant="ghost" size="sm" onClick={fetchAlerts} disabled={loading}>
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <AlertTriangle size={32} className="mx-auto mb-3" style={{ color: 'var(--color-error)' }} />
            <p className="font-medium mb-4" style={{ color: 'var(--color-text)' }}>{error}</p>
            <Button variant="outline" onClick={fetchAlerts}>Retry</Button>
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-20 rounded-xl border" style={{ borderColor: 'var(--color-border)' }}>
            <Shield size={40} className="mx-auto mb-4" style={{ color: 'var(--color-text-muted)' }} />
            <p className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>No detections yet</p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>WEIR is scanning your platforms. Your first alert will appear here within 24 hours.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => {
              const cfg = statusConfig[alert.status]
              const Icon = cfg.icon
              return (
                <div key={alert.id} className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center gap-4" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{alert.platform}</span>
                      <Badge variant={cfg.variant}>
                        <Icon size={12} className="mr-1" />
                        {cfg.label}
                      </Badge>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(37,99,235,0.1)', color: 'var(--color-info)' }}>
                        {alert.match_confidence}% match
                      </span>
                    </div>
                    <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{alert.content_url}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Detected {timeAgo(alert.detected_at)}</p>
                  </div>
                  {alert.earnings_amount && (
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-success)' }}>{formatCurrency(alert.earnings_amount)}</span>
                  )}
                  {alert.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => updateAlertStatus(alert.id, 'approved')} disabled={actionLoading === alert.id}>
                        {actionLoading === alert.id ? <Loader2 size={12} className="animate-spin" /> : 'Approve'}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => updateAlertStatus(alert.id, 'disputed')} disabled={actionLoading === alert.id}>Dispute</Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}