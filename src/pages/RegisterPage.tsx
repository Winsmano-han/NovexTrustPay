import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { supabase } from '../lib/supabase'

const schema = z
  .object({
    firstName: z.string().min(2),
    middleName: z.string().optional(),
    lastName: z.string().min(2),
    dateOfBirth: z.string().min(1),
    username: z.string().min(4),
    email: z.string().email('Enter valid email'),
    phone: z.string().min(8),
    country: z.string().min(2),
    address: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    postalCode: z.string().min(3),
    accountType: z.enum(['Personal', 'Business', 'Investment']),
    password: z.string().min(8),
    securityQuestion1: z.string().min(3),
    securityQuestion2: z.string().min(3),
    transactionPin: z.string().regex(/^[0-9]{4,6}$/, 'PIN must be 4-6 digits'),
    confirmPin: z.string(),
    termsAccepted: z.boolean().refine((v) => v, { message: 'You must accept terms' }),
  })
  .refine((data) => data.transactionPin === data.confirmPin, {
    message: 'PIN values do not match',
    path: ['confirmPin'],
  })

type FormData = z.infer<typeof schema>

const steps: { title: string; fields: (keyof FormData)[] }[] = [
  { title: 'Personal Information', fields: ['firstName', 'middleName', 'lastName', 'dateOfBirth', 'username'] },
  { title: 'Contact Information', fields: ['email', 'phone', 'country', 'address', 'city', 'state', 'postalCode'] },
  { title: 'Account Setup', fields: ['accountType', 'password', 'securityQuestion1', 'securityQuestion2', 'transactionPin', 'confirmPin', 'termsAccepted'] },
  { title: 'Verification', fields: [] },
]

export function RegisterPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { accountType: 'Personal' },
  })

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step])
  const email = watch('email')

  const next = async () => {
    const targetFields = steps[step].fields
    const valid = targetFields.length === 0 ? true : await trigger(targetFields)
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const prev = () => setStep((s) => Math.max(s - 1, 0))

  const onSubmit = async (values: FormData) => {
    setSubmitError(null)
    if (!supabase) {
      setSubmitError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
      return
    }

    setIsSending(true)

    const fullName = `${values.firstName} ${values.middleName ?? ''} ${values.lastName}`.replace(/\s+/g, ' ').trim()

    const { error: signUpError } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: fullName,
          username: values.username,
          phone: values.phone,
          country: values.country,
          address: values.address,
          city: values.city,
          state: values.state,
          postal_code: values.postalCode,
          account_type: values.accountType,
          dob: values.dateOfBirth,
          security_q1: values.securityQuestion1,
          security_q2: values.securityQuestion2,
        },
      },
    })

    if (signUpError) {
      setIsSending(false)
      setSubmitError(signUpError.message)
      return
    }

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: { shouldCreateUser: false },
    })

    if (otpError) {
      setIsSending(false)
      setSubmitError(otpError.message)
      return
    }

    const pending = {
      email: values.email,
      pin: values.transactionPin,
    }
    sessionStorage.setItem('pending_registration', JSON.stringify(pending))

    navigate(`/verify-otp?email=${encodeURIComponent(values.email)}&purpose=signup`)
  }

  return (
    <>
      <SiteHeader />
      <main className="section container auth-wrap">
        <form className="auth-card wide" onSubmit={handleSubmit(onSubmit)}>
          <h1>Account Opening - 4 Step Enrollment</h1>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <p>Step {step + 1} of {steps.length}: {steps[step].title}</p>

          {step === 0 && (
            <div className="form-grid">
              <label>Legal First Name<input {...register('firstName')} /></label>
              <label>Middle Name<input {...register('middleName')} /></label>
              <label>Legal Last Name<input {...register('lastName')} /></label>
              <label>Date of Birth<input type="date" {...register('dateOfBirth')} /></label>
              <label>Username<input {...register('username')} /></label>
            </div>
          )}

          {step === 1 && (
            <div className="form-grid">
              <label>Email Address<input type="email" {...register('email')} /></label>
              <label>Phone Number<input {...register('phone')} /></label>
              <label>Country<input {...register('country')} /></label>
              <label>Address<input {...register('address')} /></label>
              <label>City<input {...register('city')} /></label>
              <label>State/Province<input {...register('state')} /></label>
              <label>Postal Code<input {...register('postalCode')} /></label>
            </div>
          )}

          {step === 2 && (
            <div className="form-grid">
              <label>Account Type
                <select {...register('accountType')}>
                  <option value="Personal">Personal</option>
                  <option value="Business">Business</option>
                  <option value="Investment">Investment</option>
                </select>
              </label>
              <label>Password<input type="password" {...register('password')} /></label>
              <label>Security Question 1<input {...register('securityQuestion1')} placeholder="What was your first school?" /></label>
              <label>Security Question 2<input {...register('securityQuestion2')} placeholder="What is your favorite city?" /></label>
              <label>Transaction PIN (4-6 digits)<input type="password" inputMode="numeric" {...register('transactionPin')} /></label>
              <label>Confirm Transaction PIN<input type="password" inputMode="numeric" {...register('confirmPin')} /></label>
              <label className="checkbox-row"><input type="checkbox" {...register('termsAccepted')} /> I accept Terms and Conditions</label>
            </div>
          )}

          {step === 3 && (
            <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
              <p>
                We will send a one-time verification code to <strong>{email || 'your email address'}</strong>.
                After submission, enter the OTP on the verification screen to activate your account.
              </p>
              <p>
                This verification confirms ownership of the email and enables secure account access and password recovery.
              </p>
            </div>
          )}

          {(Object.values(errors).length > 0 || submitError) && (
            <small className="error">{submitError ?? 'Please fix highlighted fields before proceeding.'}</small>
          )}

          <div className="step-actions">
            {step > 0 && <button type="button" className="btn ghost" onClick={prev}>Back</button>}
            {step < steps.length - 1 && <button type="button" className="btn solid" onClick={next}>Continue</button>}
            {step === steps.length - 1 && <button type="submit" className="btn solid" disabled={isSending}>{isSending ? 'Sending OTP...' : 'Submit and Verify Email'}</button>}
          </div>
        </form>
      </main>
      <SiteFooter />
    </>
  )
}
