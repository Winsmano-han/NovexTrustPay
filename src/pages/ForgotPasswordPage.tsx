import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { supabase } from '../lib/supabase'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const sendOtp = async (event: FormEvent) => {
    event.preventDefault()
    setMessage(null)

    if (!supabase) {
      setMessage('Supabase is not configured. Add env values before using auth.')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    })
    setSubmitting(false)

    if (error) {
      setMessage(error.message)
      return
    }

    navigate(`/verify-otp?email=${encodeURIComponent(email)}&purpose=recovery`)
  }

  return (
    <>
      <SiteHeader />
      <main className="section container auth-wrap">
        <form className="auth-card" onSubmit={sendOtp}>
          <h1>Forgot Password</h1>
          <p>Enter your account email and we will send a verification OTP for password reset.</p>

          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          {message && <small className="error">{message}</small>}

          <button className="btn solid" type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send Recovery OTP'}</button>
          <a href="/login">Back to login</a>
        </form>
      </main>
      <SiteFooter />
    </>
  )
}
