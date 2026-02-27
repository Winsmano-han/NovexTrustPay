import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChartSpline,
  Landmark,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { AnimatedCounter } from '../components/AnimatedCounter'

type ServiceTab = {
  key: string
  name: string
  description: string
  bullets: string[]
  image: string
}

const features = [
  {
    icon: WalletCards,
    title: 'Instant Account Opening',
    text: 'Complete your application in under 5 minutes with guided onboarding.',
  },
  {
    icon: Landmark,
    title: 'Flexible Loan Options',
    text: 'Transparent terms for personal, business, and auto financing.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Online Banking',
    text: 'Industry-grade encryption, MFA, and real-time fraud monitoring.',
  },
  {
    icon: ChartSpline,
    title: 'Investment Management',
    text: 'Portfolio visibility and strategy support for long-term wealth growth.',
  },
  {
    icon: Sparkles,
    title: 'Insurance Solutions',
    text: 'Comprehensive coverage options tailored to your risk profile.',
  },
  {
    icon: PiggyBank,
    title: 'Savings & Rewards',
    text: 'High-yield savings products with value-added account benefits.',
  },
]

const services: ServiceTab[] = [
  {
    key: 'personal',
    name: 'Personal Banking',
    description: 'Checking and savings accounts, debit and credit cards, and consumer lending from one digital dashboard.',
    bullets: ['Economy, NOW, and Special SSB account types', 'Spend controls and transaction alerts', 'Personal loan and card support'],
    image: '/media/credit-cards-that-are-stacked-floor.jpg',
  },
  {
    key: 'business',
    name: 'Business Banking',
    description: 'Business accounts, payment operations, and tailored financing for growing teams and entrepreneurs.',
    bullets: ['Business checking and treasury tools', 'Merchant and payment processing options', 'Working capital and expansion loans'],
    image: '/media/close-up-five-rows-coins.jpg',
  },
  {
    key: 'investment',
    name: 'Investment Services',
    description: 'Planning and portfolio support designed to help clients build, preserve, and transfer wealth.',
    bullets: ['Risk-profiled strategy assistance', 'Retirement planning support', 'Long-term portfolio oversight'],
    image: '/media/credit-written-scrabble-letters-high-view.jpg',
  },
  {
    key: 'insurance',
    name: 'Insurance Products',
    description: 'Home, pet, and core insurance options integrated into your financial profile.',
    bullets: ['Coverage matching by profile and need', 'Policy management guidance', 'Premium payment convenience'],
    image: '/media/credit-card-payment-buy-sell-products-service.jpg',
  },
  {
    key: 'mortgage',
    name: 'Mortgage Solutions',
    description: 'Competitive mortgage pathways for purchases and refinancing with clear rate structures.',
    bullets: ['Fixed and flexible term options', 'Home purchase and refinance support', 'Advisor-backed application process'],
    image: '/media/african-female-happily-shopping-online-using-laptop-smartphone-while-holding-her-credit-card.jpg',
  },
]

const testimonials = [
  {
    quote:
      'NovexTrustPay made managing my finances effortless. The app is intuitive, and the customer service is exceptional.',
    author: 'Sarah M., Business Owner',
  },
  {
    quote:
      'I opened my account in less than 5 minutes. The process was seamless and I was impressed by the transparency.',
    author: 'James T., Investor',
  },
  {
    quote:
      'As a freelancer, having a business account that is easy to manage has been a game-changer for my cash flow.',
    author: 'Maria L., Freelancer',
  },
]

const stagger = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
}

export function HomePage() {
  const [activeService, setActiveService] = useState<ServiceTab>(services[0])

  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-v2" id="home">
          <div className="container hero-grid">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.p className="eyebrow" variants={stagger}>Banking Reimagined For The Modern Era</motion.p>
              <motion.h1 variants={stagger}>Empower Your Financial Future</motion.h1>
              <motion.p className="lead" variants={stagger}>
                Secure, transparent, and innovative financial solutions tailored for individuals and businesses. Open your account in minutes and manage everything from one trusted platform.
              </motion.p>
              <motion.div className="hero-actions" variants={stagger}>
                <a href="/register" className="btn solid">Open Your Account Today</a>
                <a href="#services" className="btn ghost">Schedule a Consultation</a>
              </motion.div>
            </motion.div>

            <motion.div className="hero-media" variants={stagger} initial="hidden" animate="show">
              <video autoPlay muted loop playsInline poster="/media/african-female-happily-shopping-online-using-laptop-smartphone-while-holding-her-credit-card.jpg">
                <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=cbfc53a7a5ab202f4f35f693440cf4f644a4ba31&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </section>

        <section id="trust" className="section container">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Trusted by Thousands, Backed by Excellence
          </motion.h2>
          <p className="section-note">Join a growing community of customers who choose NovexTrustPay for secure, reliable, and future-ready banking.</p>
          <div className="stats-grid">
            <article>
              <strong><AnimatedCounter to={500} suffix="K+" /></strong>
              <span>Active Customers</span>
            </article>
            <article>
              <strong>$<AnimatedCounter to={2.5} suffix="B+" decimals={1} /></strong>
              <span>Assets Under Management</span>
            </article>
            <article>
              <strong><AnimatedCounter to={99.9} suffix="%" decimals={1} /></strong>
              <span>Platform Uptime</span>
            </article>
            <article>
              <strong>24/7</strong>
              <span>Customer Support</span>
            </article>
          </div>
        </section>

        <section id="services" className="section alt">
          <div className="container">
            <h2>Banking Solutions Designed for You</h2>
            <p className="section-note">From personal savings to business financing, NovexTrustPay provides comprehensive financial products built around your goals.</p>
            <motion.div className="feature-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {features.map((item) => {
                const Icon = item.icon
                return (
                  <motion.article key={item.title} className="feature-card" variants={stagger}>
                    <div className="feature-icon-wrap">
                      <Icon size={22} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="section container split">
          <div>
            <h2>Getting Started is Simple</h2>
            <p className="section-note">Follow three clear steps to begin your journey with NovexTrustPay.</p>
            <ol>
              <li>Sign Up: Create your account with basic information in under 2 minutes.</li>
              <li>Verify: Complete identity and contact verification through secure digital checks.</li>
              <li>Start Banking: Access accounts, cards, transfers, and services immediately.</li>
            </ol>
          </div>
          <img src="/media/african-female-happily-shopping-online-using-laptop-smartphone-while-holding-her-credit-card.jpg" alt="Customer using modern mobile banking application" />
        </section>

        <section className="section alt" id="about">
          <div className="container">
            <h2>Comprehensive Financial Services</h2>
            <p className="section-note">Explore service categories without clutter using interactive tabs.</p>
            <div className="service-tabs" role="tablist" aria-label="Service categories">
              {services.map((service) => (
                <button
                  key={service.key}
                  className={`service-tab ${activeService.key === service.key ? 'active' : ''}`}
                  onClick={() => setActiveService(service)}
                  role="tab"
                  aria-selected={activeService.key === service.key}
                >
                  {service.name}
                </button>
              ))}
            </div>
            <motion.article key={activeService.key} className="service-panel" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <div>
                <h3>{activeService.name}</h3>
                <p>{activeService.description}</p>
                <ul>
                  {activeService.bullets.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
              <img src={activeService.image} alt={`${activeService.name} illustration`} />
            </motion.article>
          </div>
        </section>

        <section className="section container">
          <h2>Your Security is Our Priority</h2>
          <ul className="security-list">
            <li>256-bit SSL encryption for all transactions</li>
            <li>Multi-factor authentication for account access</li>
            <li>FDIC insurance on deposits up to $250,000</li>
            <li>ISO 27001 aligned controls and regular security audits</li>
            <li>24/7 fraud monitoring with instant alerting</li>
          </ul>
        </section>

        <section className="section alt">
          <div className="container">
            <h2>What Our Customers Say</h2>
            <div className="testimonial-grid">
              {testimonials.map((item) => (
                <blockquote key={item.author}>
                  <p>{item.quote}</p>
                  <cite>{item.author}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="section cta-section container" id="faq">
          <h2>Ready to Take Control of Your Finances?</h2>
          <p>Join thousands of satisfied customers and experience banking the way it should be.</p>
          <div className="hero-actions">
            <a href="/register" className="btn solid">Open Your Account Now</a>
            <a href="/login" className="btn ghost">Login to Dashboard</a>
          </div>
          <small className="section-note">{year} NovexTrustPay | Secure, compliant, customer-first banking.</small>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
