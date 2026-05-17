"use client"

import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Signin() {
  const [googleResponse, setGoogleResponse] = useState<string | undefined>("")
  const router = useRouter()

  useEffect(() => {
    if (googleResponse) {
      ;(async function handleSignin() {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google-signin`,
            {
              idToken: googleResponse,
            },
            {
              withCredentials: true,
            }
          )

          if (res.status === 200) {
            router.push("/dashboard")
          }
        } catch (error) {
          console.error("Google sign in failed", error)
        }
      })()
    }
  }, [googleResponse])
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Sign in
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Continue to Poker Planning
        </h2>
        <p className="text-sm text-muted-foreground">
          Use your Google account to pick up where you left off.
        </p>
      </div>

      <div className="space-y-3">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse)
            setGoogleResponse(credentialResponse.credential)
          }}
          onError={() => {
            console.log("Login Failed")
          }}
          useOneTap
        />
      </div>
    </div>
  )
}
