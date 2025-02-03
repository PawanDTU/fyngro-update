import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-sky-400 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-black text-center">Welcome to Fyngro</h1>
        <p className="text-xl mb-8 text-black text-center">Your personal finance companion</p>
        <Link
          href="/signup"
          className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 text-center mb-4"
        >
          Get Started
        </Link>
        <div className="text-center">
          <Link href="/login" className="text-blue-700 hover:text-blue-900">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

