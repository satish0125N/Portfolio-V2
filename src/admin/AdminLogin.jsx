import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Lock, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await signIn(data.email, data.password)
      toast.success('Welcome back!')
    } catch (error) {
      toast.error('Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-secondary-600">
            Sign in to access the admin dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-secondary-400" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email', { required: 'Email is required' })}
                    className="pl-10 block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="admin@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-secondary-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-secondary-400" />
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    {...register('password', { required: 'Password is required' })}
                    className="pl-10 block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
