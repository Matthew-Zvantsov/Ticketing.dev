'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type SubmitEvent } from 'react'
import useRequest from '../hooks/use-request'

interface AuthFormProps {
  title: string
  alternatePrompt: string
  alternateLinkLabel: string
  alternateLinkHref: string
  url: string
  submitLabel: string
  pendingLabel: string
  errorMessage: string
}

export default function AuthForm({
  title,
  alternatePrompt,
  alternateLinkLabel,
  alternateLinkHref,
  url,
  submitLabel,
  pendingLabel,
  errorMessage,
}: AuthFormProps) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const { doRequest, errors } = useRequest()

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)

    const formData = new FormData(e.currentTarget)
    const payload = {
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
    }

    try {
      await doRequest({
        url,
        method: 'post',
        body: payload,
        errorMessage,
        onSuccess: () => {
          router.push('/')
          router.refresh()
        },
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {alternatePrompt}{' '}
          <Link href={alternateLinkHref} className="font-medium text-blue-600 hover:text-blue-500">
            {alternateLinkLabel}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input id="email" name="email" type="email" required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input id="password" name="password" type="password" required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password" />
              </div>
            </div>

            {errors.length > 0 && (
              <ul className="list-disc list-inside space-y-1 bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded" role="alert">
                {errors.map((err) => (
                  <li key={err.message}>{err.message}</li>
                ))}
              </ul>
            )}

            <div>
              <button type="submit" disabled={pending}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {pending ? pendingLabel : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}