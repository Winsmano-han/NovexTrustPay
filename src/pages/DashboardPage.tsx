import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'

export function DashboardPage() {
  return (
    <>
      <SiteHeader />
      <main className="section container">
        <h1>Dashboard</h1>
        <p>Personalized account overview with quick actions and insights.</p>

        <div className="stats-grid">
          <article><strong>$24,580.32</strong><span>Available Balance</span></article>
          <article><strong>$1,240.00</strong><span>Monthly Savings</span></article>
          <article><strong>12</strong><span>Recent Transactions</span></article>
          <article><strong>3</strong><span>Active Alerts</span></article>
        </div>

        <section className="section alt" style={{ marginTop: '2rem' }}>
          <div className="container" style={{ padding: 0 }}>
            <h2>Quick Actions</h2>
            <div className="feature-grid">
              <article className="feature-card"><h3>Transfer Funds</h3><p>Move money between internal and external accounts.</p></article>
              <article className="feature-card"><h3>Pay Bills</h3><p>Schedule one-time or recurring payments.</p></article>
              <article className="feature-card"><h3>Apply for Loan</h3><p>Start a new lending application with guided steps.</p></article>
              <article className="feature-card"><h3>View Statements</h3><p>Access downloadable monthly statements instantly.</p></article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
