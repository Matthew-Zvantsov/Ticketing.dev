'use client'

import { useState, type SubmitEvent } from 'react'
import { useRouter } from 'next/navigation'

type ApiError = {
  message: string
  field?: string
}

type ApiErrorResponse = {
  errors: ApiError[]
}

export default function SignUpPage() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const [errors, setErrors] = useState<ApiError[]>([])

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors([])
    setPending(true)

    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        credentials: 'include', // важно: без этого браузер не примет/не отправит cookie
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data: ApiErrorResponse | null = await res.json().catch(() => null)
        setErrors(
          data?.errors?.length
            ? data.errors
            : [{ message: 'Sign up failed. Please try again.' }]
        )
        return
      }

      router.push('/')
    } catch {
      setErrors([{ message: 'Connection error. Please check your internet connection.' }])
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
              Or <b/>
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in to your account
              </a>
          </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit} noValidate>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input id="email" name="email" type="email" required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email address"/>
                  </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input id="password" name="password" type="password" required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"/>
                </div>
              </div>

              {errors.length > 0 && 
                (
                  <ul className="list-disc list-inside space-y-1 bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded" role="alert">
                    {errors.map((err) => (
                      <li key={err.message}>
                        {err.message}
                      </li>
                    ))}
                  </ul>
                )
              }

              <div>
                <button type="submit" disabled={pending}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {pending ? 'Signing up...' : 'Sign up'}
                </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}