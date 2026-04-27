import Link from "next/link"
import type { ReactNode } from "react"

import { buttonVariants } from "@/common/components/ui/button"
import { cn } from "@/lib/utils"

interface GoogleButtonProps {
  href: string
  className?: string
  children?: ReactNode
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.8 12.23c0-.76-.07-1.49-.2-2.18H12v4.13h5.5a4.7 4.7 0 0 1-2.04 3.08v2.56h3.31c1.94-1.78 3.03-4.4 3.03-7.59Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.75 0 5.05-.91 6.74-2.47l-3.31-2.56c-.91.61-2.08.98-3.43.98-2.64 0-4.88-1.78-5.67-4.18H2.91v2.64A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.33 13.77A5.98 5.98 0 0 1 6 12c0-.61.11-1.2.33-1.77V7.59H2.91a10 10 0 0 0 0 8.82l3.42-2.64Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.05c1.5 0 2.84.52 3.9 1.52l2.92-2.92C17.04 2.98 14.74 2 12 2A10 10 0 0 0 2.91 7.59l3.42 2.64C7.12 7.83 9.36 6.05 12 6.05Z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function GoogleButton({
  href,
  className,
  children = "Continue with Google",
}: GoogleButtonProps) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "outline", size: "default" }),
        "h-10 w-full gap-2 rounded-lg border-border bg-white px-3 text-foreground shadow-sm hover:bg-muted",
        className
      )}
      href={href}
    >
      <GoogleIcon />
      <span className="truncate">{children}</span>
    </Link>
  )
}
