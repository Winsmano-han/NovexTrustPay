import { motion } from 'framer-motion'
import { ShieldCheck, Wallet, Landmark, ChartColumn, BriefcaseBusiness, PiggyBank } from 'lucide-react'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { AnimatedCounter } from '../components/AnimatedCounter'

const features = [
  { icon: Wallet, title: 'Instant Account Opening', text: 'Complete your enrollment in minutes with guided digital steps.' },
  { icon: Landmark, title: 'Flexible Loan Options', text: 'Competitive personal, business, and auto loan pathways.' },
  { icon: ShieldCheck, title: 'Secure Online Banking', text: '24/7 access protected by modern encryption and MFA.' },
  { icon: ChartColumn, title: 'Investment Management', text: 'Build wealth with strategy tools and expert guidance.' },
  { icon: BriefcaseBusiness, title: 'Insurance Solutions', text: 'Coverage options tailored for personal and business needs.' },
  { icon: PiggyBank, title: 'Savings & Rewards', text: 'High-yield savings products with attractive account benefits.' },
]

const serviceTabs = [
  { name: 'Personal Banking', desc: 'Checking and savings accounts, debit/credit cards, and personal loans.' },
  { name: 'Business Banking', desc: 'Business accounts, merchant services, and financing support.' },
  { name: 'Investment Services', desc: 'Portfolio management, retirement planning, and risk balancing.' },
  { name: 'Insurance Products', desc: 'Life, health, home, and auto protection options.' },
  { name: 'Mortgage Solutions', desc: 'Home purchase and refinancing with flexible repayment plans.' },
]

const testimonials = [
  'NovexTrustPay made managing my finances effortless. The app is intuitive and support is exceptional. - Sarah M.',
  'I opened my account in less than 5 minutes and rates were genuinely competitive. - James T.',
  'As a freelancer, their business tools made cash flow and payments far easier. - Maria L.',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-v2">
          <div className="container hero-grid">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <p className="eyebrow">Banking Reimagined For The Modern Era</p>
              <h1>Your Financial Future Starts Here</h1>
              <p className="lead">Secure, transparent, and designed for your success. Open your account in minutes and unlock unlimited financial possibilities.</p>
              <div className="hero-actions">
                <a href="/register" className="btn solid">Open Your Account Today</a>
                <a href="#services" className="btn ghost">Learn More</a>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.15 }} className="hero-media">
              <img src="/media/african-female-happily-shopping-online-using-laptop-smartphone-while-holding-her-credit-card.jpg" alt="Customer managing finances online" />
            </motion.div>
          </div>
        </section>

        <section id="trust" className="section container">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>Trusted by Thousands, Backed by Excellence</motion.h2>
          <div className="stats-grid">
            <article><strong><AnimatedCounter to={500} suffix="K+" /></strong><span>Active Customers</span></article>
            <article><strong>$<AnimatedCounter to={25} suffix="B+" /></strong><span>Assets Under Management</span></article>
            <article><strong><AnimatedCounter to={99} suffix=".9%" /></strong><span>Platform Uptime</span></article>
            <article><strong><AnimatedCounter to={24} suffix="/7" /></strong><span>Customer Support</span></article>
          </div>
        </section>

        <section id="services" className="section alt">
          <div className="container">
            <h2>Banking Solutions Designed for You</h2>
            <div className="feature-grid">
              {features.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.article key={item.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: idx * 0.06 }} className="feature-card">
                    <Icon size={22} />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section container split">
          <div>
            <h2>Getting Started is Simple</h2>
            <ol>
              <li>Sign Up: Create your account in under 2 minutes.</li>
              <li>Verify: Complete identity and contact verification securely.</li>
              <li>Start Banking: Access all services immediately.</li>
            </ol>
          </div>
          <img src="/media/credit-card-payment-buy-sell-products-service.jpg" alt="User making secure digital payment" />
        </section>

        <section className="section alt" id="about">
          <div className="container">
            <h2>Comprehensive Financial Services</h2>
            <div className="service-list">
              {serviceTabs.map((service) => (
                <article key={service.name}>
                  <h3>{service.name}</h3>
                  <p>{service.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section container">
          <h2>Your Security is Our Priority</h2>
          <ul className="security-list">
            <li>256-bit SSL encryption for all transactions</li>
            <li>Multi-factor authentication for account access</li>
            <li>FDIC insurance on deposits up to $250,000</li>
            <li>Regular security audits and compliance checks</li>
            <li>24/7 fraud monitoring and alerting</li>
          </ul>
        </section>

        <section className="section alt">
          <div className="container">
            <h2>What Our Customers Say</h2>
            <div className="testimonial-grid">
              {testimonials.map((quote) => <blockquote key={quote}>{quote}</blockquote>)}
            </div>
          </div>
        </section>

        <section className="section cta-section container" id="faq">
          <h2>Ready to Take Control of Your Finances?</h2>
          <p>Join thousands of satisfied customers and experience banking the way it should be.</p>
          <div className="hero-actions">
            <a href="/register" className="btn solid">Open Your Account Now</a>
            <a href="/login" className="btn ghost">Schedule a Free Consultation</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
