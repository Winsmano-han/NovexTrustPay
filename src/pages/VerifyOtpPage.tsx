import { useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { supabase } from '../lib/supabase'

export function VerifyOtpPage() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') ?? ''
  const purpose = searchParams.get('purpose') ?? 'login'

  const navigate = useNavigate()
  const [token, setToken] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setMessage(null)

    if (!supabase) {
      setMessage('Supabase is not configured. Add env values before using auth.')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    })
    setSubmitting(false)

    if (error) {
      setMessage(error.message)
      return
    }

    if (purpose === 'recovery') {
      navigate('/reset-password')
      return
    }

    if (purpose === 'signup') {
      const pending = sessionStorage.getItem('pending_registration')
      if (pending) {
        const data = JSON.parse(pending) as { pin?: string }
        if (data.pin) {
          await supabase.rpc('set_transaction_pin', { pin: data.pin })
        }
        sessionStorage.removeItem('pending_registration')
      }
    }

    navigate('/dashboard')
  }

  return (
    <>
      <SiteHeader />
      <main className="section container auth-wrap">
        <form className="auth-card" onSubmit={onSubmit}>
          <h1>Verify Your Email</h1>
          <p>Enter the one-time code sent to <strong>{email || 'your email'}</strong>.</p>

          <label>One-Time Password (OTP)</label>
          <input value={token} onChange={(e) => setToken(e.target.value.trim())} placeholder="6-digit code" />

          {message && <small className="error">{message}</small>}

          <button className="btn solid" type="submit" disabled={submitting}>{submitting ? 'Verifying...' : 'Verify Code'}</button>
          <a href="/login">Back to login</a>
        </form>
      </main>
      <SiteFooter />
    </>
  )
}
