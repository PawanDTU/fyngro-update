"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dynamic from "next/dynamic"
import { FaGoogle } from "react-icons/fa"
import axios from "axios";


interface SignupResponse {
  message: string;
}

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false })

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement // Access form directly from the event

    // Create FormData object from the form
    const formData = new FormData(form)

    // Convert FormData to a plain object
    const data = Object.fromEntries(formData.entries())

    // You can check for required fields here if needed
    if (!data.name || !data.email || !data.password) {
      alert('Please fill all fields')
      return
    }

    try {
      const response = await axios.post<SignupResponse>('/api/auth/register', data)

      if (response.status === 201) {
        // Successful signup, redirect to the dashboard
        console.log('Signup successful!')
        router.push('/dashboard')
      } else {
        // Handle error in the response
        console.error(response.data.message)
        alert(response.data.message || 'An error occurred')
      }
    } catch (error) {
      console.error('Error signing up:', error)
      alert('An error occurred. Please try again.')
    }
  }

  const handleGoogleSignup = () => {
    // Implement Google signup logic here
    console.log("Signing up with Google")
  }

  return (
    <div className="min-h-screen bg-sky-400 flex flex-col justify-center items-center p-4">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-black text-center">Sign Up for Fyngro</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-black text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
              name="name"
              />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black text-sm font-bold mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
              />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-black text-sm font-bold mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-black">Remember me</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mb-4"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center justify-center mb-4">
          <span className="border-b w-1/5 lg:w-1/4"></span>
          <span className="text-xs text-center text-black uppercase px-2">or</span>
          <span className="border-b w-1/5 lg:w-1/4"></span>
        </div>
        <button
          onClick={handleGoogleSignup}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full flex items-center justify-center mb-4"
        >
          <FaGoogle className="mr-2" /> Sign up with Google
        </button>
        <div className="text-center">
          <Link href="/login" className="text-blue-700 hover:text-blue-900">
            Already have an account? Log in
          </Link>
        </div>
      </MotionDiv>
    </div>
  )
}

