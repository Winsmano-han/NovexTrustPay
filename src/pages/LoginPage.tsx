import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { supabase } from '../lib/supabase'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
})

type LoginForm = z.infer<typeof schema>

export function LoginPage() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    defaultValues: { remember: true },
  })

  const onSubmit = async (values: LoginForm) => {
    setErrorMessage(null)

    if (!supabase) {
      setErrorMessage('Supabase is not configured. Add env values before using auth.')
      return
    }

    setSubmitting(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    setSubmitting(false)

    if (error) {
      setErrorMessage(error.message)
      return
    }

    navigate('/dashboard')
  }

  const sendLoginOtp = async () => {
    setErrorMessage(null)

    if (!supabase) {
      setErrorMessage('Supabase is not configured. Add env values before using auth.')
      return
    }

    const email = getValues('email')
    if (!email) {
      setErrorMessage('Enter your email first to receive OTP.')
      return
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    })

    if (error) {
      setErrorMessage(error.message)
      return
    }

    navigate(`/verify-otp?email=${encodeURIComponent(email)}&purpose=login`)
  }

  return (
    <>
      <SiteHeader />
      <main className="section container auth-wrap">
        <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
          <h1>Online Banking Login</h1>
          <p>Secure account access with password or one-time email verification code.</p>

          <label>Email Address</label>
          <input type="email" {...register('email')} />
          {errors.email && <small>{errors.email.message}</small>}

          <label>Password</label>
          <input type="password" {...register('password')} />
          {errors.password && <small>{errors.password.message}</small>}

          <label className="checkbox-row"><input type="checkbox" {...register('remember')} /> Stay signed in for 30 days</label>

          {errorMessage && <small className="error">{errorMessage}</small>}

          <button className="btn solid" type="submit" disabled={submitting}>{submitting ? 'Signing in...' : 'Login'}</button>
          <button className="btn ghost" type="button" onClick={sendLoginOtp}>Use Email OTP Instead</button>
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/register">Need an account? Register</a>
        </form>
      </main>
      <SiteFooter />
    </>
  )
}
