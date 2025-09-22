import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@/context/UserContext'
import { loginSchema } from '@/zodSchemas'

type LoginFormData = z.infer<typeof loginSchema>

const LoginForm = () => {
    const loginApiUrl = import.meta.env.VITE_API_URL + "/api/auth/login"
    const navigate = useNavigate()
    const { setUser } = useUserContext()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onSubmit',
    })

    const onSubmit = async (data: LoginFormData) => {
        console.log('Form Data:', data)
        const response = await fetch(loginApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            toast.error('Login failed')
            return
        }
        const resJson = await response.json()
        setUser({
            role: resJson.role,
            username: resJson.username
        })
        toast.success('Login successfully!')
        setTimeout(() => {
            navigate('/')
        }, 1000)
    }

    return (
        <div className="h-full flex flex-col justify-center gap-6">
            <h1 className='text-xl font-semibold text-center'>Login</h1>
            <form action={loginApiUrl} method='POST' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4' >
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

                <Button type="submit" disabled={isSubmitting} className='disabled:opacity-50'>
                    {
                        isSubmitting ?
                            <span className='animate-spin rounded-full border-2 border-border border-t-transparent h-3 w-3'></span> : null
                    }
                    {isSubmitting ? 'Logging In...' : 'Login'}
                </Button>
            </form>
        </div>
    )
}

export default LoginForm
