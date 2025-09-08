import { Controller, useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useNavigate } from 'react-router-dom'

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed'),
  email: z.email('Enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long')
    .regex(/[A-Z]/, 'Add at least one uppercase letter')
    .regex(/[a-z]/, 'Add at least one lowercase letter')
    .regex(/[0-9]/, 'Add at least one number'),
  role: z.enum(['ADMIN', 'CUSTOMER']),
})

type RegisterFormData = z.infer<typeof registerSchema>

const RegisterForm = () => {
  const appName = import.meta.env.VITE_APP_NAME
  const registerApiUrl = import.meta.env.VITE_API_URL + "/api/users/register"
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    defaultValues: { role: 'CUSTOMER' },
  })

  const onSubmit = async (data: RegisterFormData) => {
    const response = await fetch(registerApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorData = await response.json()
      toast.error(errorData.error || 'Registration failed')
      return
    }
    const responseData = await response.json()
    toast.success(responseData.message || 'Registered successfully!')
    navigate('/auth/login');
  }

  return (
    <div className="h-full flex flex-col justify-center gap-6">
      <h1 className='text-xl font-semibold text-center'>Register with {appName}</h1>
      <form action={registerApiUrl} method='POST' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4' >
        <div className='flex flex-col gap-1'>
          <Input
            type='text'
            placeholder='Username'
            required
            className='w-full'
            {...register('username')}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <Input
            type='email'
            placeholder='Email'
            required
            className='w-full'
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <Input
            type='password'
            placeholder='Password'
            required
            className='w-full'
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="CUSTOMER">Customer</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>


        <Button type="submit" disabled={isSubmitting} className='disabled:opacity-50'>
          {
            isSubmitting ?
              <span className='animate-spin rounded-full border-2 border-border border-t-transparent h-3 w-3'></span> : null
          }
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </div>
  )
}

export default RegisterForm
