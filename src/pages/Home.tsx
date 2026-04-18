import { Link } from 'react-router-dom'
import { Shield, Zap, DollarSign, FileCheck, AlertTriangle } from 'lucide-react'
import { Button } from '../components/ui/button'
import Footer from '../components/Footer'

const features = [
  {
    icon: '🛡️',
    title: 'Real-Time AI Detection',
    desc: 'Our matching engine scans social platforms and ad networks 24/7, flagging unauthorized use of your name, image, or likeness within minutes.'
  },
  {
    icon: '⚡',
    title: 'One-Tap Actions',
    desc: 'Approve, monetize, or dispute any detected use with a single tap. No legal jargon. No back-and-forth. Just instant, enforceable decisions.'
  },
  {
    icon: '📄',
    title: 'License Templates',
    desc: 'Issue legally-valid NIL licenses in seconds. Set platform controls, duration, and fee — then track compliance with a full audit trail.'
  },
  {
    icon: '💰',
    title: 'Transparent Earnings',
    desc: 'See every dollar broken down by platform and license type. Direct payouts with zero hidden fees and real-time balance updates.'
  },
  {
    icon: '⚖️',
    title: 'Dispute Resolution',
    desc: 'When brands push back, our integrated resolution system handles the process end-to-end — escalating to legal when needed.'
  },
  {
    icon: '🤖',
    title: 'Deepfake & AI Replica Guard',
    desc: 'The only NIL platform with visual content matching for deepfakes and unauthorized AI replicas — protecting your identity at a new level.'
  }
]

const pricingTiers = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    features: ['Up to 3 platform monitors', 'Basic alert notifications', 'Community license templates', '5% earnings fee'],
    cta: 'Start free',
    highlighted: false
  },
  {
    name: 'Creator',
    price: '$29',
    period: 'per month',
    features: ['Unlimited platform monitors', 'Real-time AI detection', 'Custom license templates', 'Dispute resolution tools', '2% earnings fee'],
    cta: 'Start free trial',
    highlighted: true
  },
  {
    name: 'Pro',
    price: '$79',
    period: 'per month',
    features: ['Everything in Creator', 'Deepfake & AI replica guard', 'Priority dispute escalation', 'Dedicated account manager', '0% earnings fee'],
    cta: 'Contact sales',
    highlighted: false
  }
]

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl tracking-tight" style={{ color: 'var(--color-primary)' }}>WEIR</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/pricing" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: 'var(--color-text-secondary)' }}>Pricing</Link>
            <Link to="/login" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: 'var(--color-text-secondary)' }}>Log in</Link>
            <Button asChild size="sm">
              <Link to="/signup">Start free</Link>
            </Button>
          </nav>
          <div className="flex md:hidden items-center gap-3">
            <Link to="/login" className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Log in</Link>
            <Button asChild size="sm">
              <Link to="/signup">Start free</Link>
            </Button>
          </div>
        </div>
      </header>

      <section
        className="relative min-h-[100svh] flex items-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1657412235086-c2de1a1176a9?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIwY29uZmlkZW50JTIwY3JlYXRvciUyMGluJTIwbW9kZXJuJTIwc3R1ZGlvJTIwbGlnaHRpbmclMkMlMjBzdXJyb3VuZGVkJTIwYnl8ZW58MHwwfHx8MTc3NjQ5OTg5NXww&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>NIL Protection Platform</span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-6" style={{ letterSpacing: 'var(--tracking-display)' }}>
              Your identity earns money.<br />WEIR makes sure you get paid.
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
              Real-time AI detection across every platform. Legally-valid licenses in seconds. Transparent payouts with zero hidden fees.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="text-base">
                <Link to="/signup">Get your dashboard</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base text-white border-white/40 hover:bg-gray-900/10">
                <Link to="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>Everything you need to own your NIL</h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>Built for creators, athletes, and influencers who are serious about protection and revenue.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>Simple, honest pricing</h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>No lock-in. Cancel anytime. Your earnings are always yours.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className="p-8 rounded-xl border relative"
                style={{
                  backgroundColor: tier.highlighted ? 'var(--color-primary)' : 'var(--color-bg)',
                  borderColor: tier.highlighted ? 'var(--color-primary)' : 'var(--color-border)'
                }}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-6 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white" style={{ color: 'var(--color-primary)' }}>Most popular</span>
                )}
                <div className="mb-6">
                  <p className="font-semibold text-sm mb-1" style={{ color: tier.highlighted ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)' }}>{tier.name}</p>
                  <p className="text-4xl font-bold" style={{ color: tier.highlighted ? '#ffffff' : 'var(--color-text)' }}>{tier.price}</p>
                  <p className="text-sm" style={{ color: tier.highlighted ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)' }}>{tier.period}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm" style={{ color: tier.highlighted ? 'rgba(255,255,255,0.9)' : 'var(--color-text-secondary)' }}>
                      <Shield size={14} className="mt-0.5 shrink-0" style={{ color: tier.highlighted ? '#ffffff' : 'var(--color-success)' }} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full" variant={tier.highlighted ? 'secondary' : 'default'}>
                  <Link to="/signup">{tier.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-3 mb-6">
            <AlertTriangle size={20} style={{ color: 'var(--color-warning)' }} />
            <Zap size={20} style={{ color: 'var(--color-primary)' }} />
            <DollarSign size={20} style={{ color: 'var(--color-success)' }} />
            <FileCheck size={20} style={{ color: 'var(--color-accent)' }} />
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Start protecting your identity today</h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>Set up in under 5 minutes. First detection alert within 24 hours.</p>
          <Button asChild size="lg">
            <Link to="/signup">Start free</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
