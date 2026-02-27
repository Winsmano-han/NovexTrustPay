import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'

const schema = z.object({
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
  termsAccepted: z.boolean().refine((v) => v, { message: 'You must accept terms' }),
  emailCode: z.string().min(4),
  phoneCode: z.string().min(4),
  idReference: z.string().min(4),
})

type FormData = z.infer<typeof schema>

const steps: { title: string; fields: (keyof FormData)[] }[] = [
  { title: 'Personal Information', fields: ['firstName', 'middleName', 'lastName', 'dateOfBirth', 'username'] },
  { title: 'Contact Information', fields: ['email', 'phone', 'country', 'address', 'city', 'state', 'postalCode'] },
  { title: 'Account Setup', fields: ['accountType', 'password', 'securityQuestion1', 'securityQuestion2', 'termsAccepted'] },
  { title: 'Verification', fields: ['emailCode', 'phoneCode', 'idReference'] },
]

export function RegisterPage() {
  const [step, setStep] = useState(0)
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step])

  const next = async () => {
    const valid = await trigger(steps[step].fields)
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const prev = () => setStep((s) => Math.max(s - 1, 0))

  const onSubmit = () => {
    alert('Enrollment submitted successfully. Verification review has started.')
    window.location.href = '/login'
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
              <label className="checkbox-row"><input type="checkbox" {...register('termsAccepted')} /> I accept Terms and Conditions</label>
            </div>
          )}

          {step === 3 && (
            <div className="form-grid">
              <label>Email Verification Code<input {...register('emailCode')} /></label>
              <label>Phone Verification Code<input {...register('phoneCode')} /></label>
              <label>Identity Verification Reference<input {...register('idReference')} /></label>
            </div>
          )}

          {Object.values(errors).length > 0 && <small className="error">Please fix highlighted fields before proceeding.</small>}

          <div className="step-actions">
            {step > 0 && <button type="button" className="btn ghost" onClick={prev}>Back</button>}
            {step < steps.length - 1 && <button type="button" className="btn solid" onClick={next}>Continue</button>}
            {step === steps.length - 1 && <button type="submit" className="btn solid">Submit Enrollment</button>}
          </div>
        </form>
      </main>
      <SiteFooter />
    </>
  )
}
