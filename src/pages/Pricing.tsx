import { Link } from 'react-router-dom'
import { Shield, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    desc: 'For creators just getting started with NIL protection.',
    features: ['Up to 3 platform monitors', 'Weekly alert digest', 'Community license templates', '5% earnings fee', 'Email support'],
    cta: 'Start free',
    highlighted: false
  },
  {
    name: 'Creator',
    price: '$29',
    period: 'per month',
    desc: 'For active creators who need real-time protection and monetization.',
    features: ['Unlimited platform monitors', 'Real-time AI detection alerts', 'Custom license templates', 'Platform usage controls', 'Dispute resolution tools', '2% earnings fee', 'Priority email support'],
    cta: 'Start 14-day trial',
    highlighted: true
  },
  {
    name: 'Pro',
    price: '$79',
    period: 'per month',
    desc: 'For athletes and high-profile creators who need maximum protection.',
    features: ['Everything in Creator', 'Deepfake & AI replica guard', 'Legal escalation service', 'Priority dispute resolution', 'Dedicated account manager', 'White-label license PDFs', '0% earnings fee'],
    cta: 'Contact sales',
    highlighted: false
  }
]

const faqs = [
  { q: 'How does WEIR detect unauthorized uses?', a: 'Our AI engine uses visual content matching, text fingerprinting, and metadata analysis to scan social platforms and ad networks 24/7, flagging any use of your name, image, or likeness.' },
  { q: 'What is a NIL license and is it legally valid?', a: 'A NIL (Name, Image, Likeness) license grants a brand permission to use your identity for a defined purpose and fee. WEIR licenses are generated from legally-reviewed templates and include a full audit trail for enforceability.' },
  { q: 'When and how do I get paid?', a: 'Earnings are visible in real time on your dashboard. Payouts are issued weekly via bank transfer or Stripe. There are no hidden processing fees beyond the plan percentage.' },
  { q: 'What happens when I file a dispute?', a: 'WEIR notifies the brand, pauses their use, and starts a structured resolution timeline. If unresolved within 14 days, we escalate to our legal partners at no extra cost on the Pro plan.' },
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel from your account settings with one click. Your data is retained for 30 days so you can export anything you need.' }
]

export default function Pricing() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>Simple, honest pricing</h1>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>No hidden fees. No lock-in. Your earnings are always yours.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="p-8 rounded-2xl border relative"
              style={{
                backgroundColor: plan.highlighted ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                borderColor: plan.highlighted ? 'var(--color-primary)' : 'var(--color-border)'
              }}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-6 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white" style={{ color: 'var(--color-primary)' }}>Most popular</span>
              )}
              <p className="font-semibold text-sm mb-1" style={{ color: plan.highlighted ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)' }}>{plan.name}</p>
              <p className="text-4xl font-bold mb-1" style={{ color: plan.highlighted ? '#ffffff' : 'var(--color-text)' }}>{plan.price}</p>
              <p className="text-sm mb-3" style={{ color: plan.highlighted ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)' }}>{plan.period}</p>
              <p className="text-sm mb-6" style={{ color: plan.highlighted ? 'rgba(255,255,255,0.85)' : 'var(--color-text-secondary)' }}>{plan.desc}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm" style={{ color: plan.highlighted ? 'rgba(255,255,255,0.9)' : 'var(--color-text-secondary)' }}>
                    <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: plan.highlighted ? '#ffffff' : 'var(--color-success)' }} />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full" variant={plan.highlighted ? 'secondary' : 'default'}>
                <Link to="/signup">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Frequently asked questions</h2>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Still have questions? Email us at <a href="mailto:support@weir.app" className="underline" style={{ color: 'var(--color-primary)' }}>support@weir.app</a></p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-start gap-3">
                <Shield size={16} className="mt-1 shrink-0" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <p className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{faq.q}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
