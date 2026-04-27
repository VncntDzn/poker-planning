import { GoogleButton } from "@/common/components/google-button"
import { OutlookButton } from "@/common/components/outlook-button"

export default function Signin() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
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
        <GoogleButton href="/api/auth/google" />
        <OutlookButton href="/api/auth/outlook" />
      </div>
    </div>
  )
}
