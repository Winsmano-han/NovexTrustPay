import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { supabase } from '../lib/supabase'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setMessage(null)

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Password values do not match.')
      return
    }

    if (!supabase) {
      setMessage('Supabase is not configured. Add env values before using auth.')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.auth.updateUser({ password })
    setSubmitting(false)

    if (error) {
      setMessage(error.message)
      return
    }

    navigate('/login')
  }

  return (
    <>
      <SiteHeader />
      <main className="section container auth-wrap">
        <form className="auth-card" onSubmit={onSubmit}>
          <h1>Reset Password</h1>
          <p>Set a new secure password for your NovexTrustPay account.</p>

          <label>New Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label>Confirm New Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          {message && <small className="error">{message}</small>}

          <button className="btn solid" type="submit" disabled={submitting}>{submitting ? 'Updating...' : 'Update Password'}</button>
          <a href="/login">Back to login</a>
        </form>
      </main>
      <SiteFooter />
    </>
  )
}
