import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { supabase } from '../lib/supabase'

export function SetPinPage() {
  const navigate = useNavigate()
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setMessage(null)

    if (!supabase) {
      setMessage('Supabase is not configured. Add env values before using auth.')
      return
    }

    if (!/^[0-9]{4,6}$/.test(pin)) {
      setMessage('Transaction PIN must be 4 to 6 digits.')
      return
    }

    if (pin !== confirmPin) {
      setMessage('PIN values do not match.')
      return
    }

    setSaving(true)
    const { error } = await supabase.rpc('set_transaction_pin', { pin })
    setSaving(false)

    if (error) {
      setMessage(error.message)
      return
    }

    navigate('/dashboard')
  }

  return (
    <>
      <SiteHeader />
      <main className="section container auth-wrap">
        <form className="auth-card register-modern" onSubmit={onSubmit}>
          <h1>Set Transaction PIN</h1>
          <p>Your transaction PIN is separate from your password and will be used to authorize sensitive banking actions.</p>

          <label>Transaction PIN (4-6 digits)</label>
          <input type="password" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value)} required />

          <label>Confirm Transaction PIN</label>
          <input type="password" inputMode="numeric" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} required />

          {message && <small className="error">{message}</small>}

          <button className="btn solid" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save PIN and Continue'}</button>
        </form>
      </main>
      <SiteFooter />
    </>
  )
}
