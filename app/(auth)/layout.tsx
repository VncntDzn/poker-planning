import React, { ReactNode } from "react"

interface Props {
  children: ReactNode
}
export default function AuthLayout({ children }: Props) {
  return (
    <main className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Section */}
      <section className="hidden flex-1 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white lg:flex">
        <div className="px-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">Welcome Back!</h1>
          <p className="text-lg">
            Plan your poker sessions effortlessly with our modern tools.
          </p>
        </div>
      </section>

      {/* Right Section */}
      <section className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-md rounded-lg px-8 py-12 shadow-lg">
          {children}
        </div>
      </section>
    </main>
  )
}
