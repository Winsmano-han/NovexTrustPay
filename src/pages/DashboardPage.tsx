import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { supabase } from '../lib/supabase'

type Profile = {
  full_name: string | null
  account_type: string | null
}

export function DashboardPage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [pinMessage, setPinMessage] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!supabase) return

      const { data: userResult } = await supabase.auth.getUser()
      if (!userResult.user) {
        navigate('/login')
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('full_name, account_type')
        .eq('user_id', userResult.user.id)
        .single()

      if (data) setProfile(data)
    }

    void load()
  }, [navigate])

  const savePin = async (event: FormEvent) => {
    event.preventDefault()
    setPinMessage(null)

    if (!supabase) {
      setPinMessage('Supabase is not configured. Add env values before using auth.')
      return
    }

    if (!/^[0-9]{4,6}$/.test(pin)) {
      setPinMessage('PIN must be 4 to 6 digits.')
      return
    }

    if (pin !== confirmPin) {
      setPinMessage('PIN values do not match.')
      return
    }

    const { error } = await supabase.rpc('set_transaction_pin', { pin })
    if (error) {
      setPinMessage(error.message)
      return
    }

    setPinMessage('Transaction PIN updated successfully.')
    setPin('')
    setConfirmPin('')
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <>
      <SiteHeader />
      <main className="section container">
        <div className="dashboard-head">
          <h1>Dashboard</h1>
          <button className="btn ghost" type="button" onClick={signOut}>Sign Out</button>
        </div>
        <p>Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}. Manage your accounts and security preferences from here.</p>

        <div className="stats-grid">
          <article><strong>$24,580.32</strong><span>Available Balance</span></article>
          <article><strong>$1,240.00</strong><span>Monthly Savings</span></article>
          <article><strong>12</strong><span>Recent Transactions</span></article>
          <article><strong>{profile?.account_type ?? 'Personal'}</strong><span>Primary Account Type</span></article>
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

        <section className="section">
          <h2>Transaction PIN Settings</h2>
          <form className="auth-card" onSubmit={savePin}>
            <label>New Transaction PIN (4-6 digits)</label>
            <input value={pin} onChange={(e) => setPin(e.target.value)} inputMode="numeric" required />

            <label>Confirm Transaction PIN</label>
            <input value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} inputMode="numeric" required />

            {pinMessage && <small className={pinMessage.includes('successfully') ? '' : 'error'}>{pinMessage}</small>}

            <button className="btn solid" type="submit">Save PIN</button>
          </form>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
