import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'

const schema = z.object({
  identifier: z.string().min(3, 'Enter username or email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
})

type LoginForm = z.infer<typeof schema>

export function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    defaultValues: { remember: true },
  })

  const onSubmit = () => {
    window.location.href = '/dashboard'
  }

  return (
    <>
      <SiteHeader />
      <main className="section container auth-wrap">
        <form className="auth-card" onSubmit={handleSubmit(onSubmit)}>
          <h1>Online Banking Login</h1>
          <p>Secure account access with multi-layer protection.</p>

          <label>Username or Email</label>
          <input {...register('identifier')} />
          {errors.identifier && <small>{errors.identifier.message}</small>}

          <label>Password</label>
          <input type="password" {...register('password')} />
          {errors.password && <small>{errors.password.message}</small>}

          <label className="checkbox-row"><input type="checkbox" {...register('remember')} /> Stay signed in for 30 days</label>

          <button className="btn solid" type="submit">Login</button>
          <a href="#">Forgot Password?</a>
          <a href="/register">Need an account? Register</a>
        </form>
      </main>
      <SiteFooter />
    </>
  )
}
