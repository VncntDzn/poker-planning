import Link from "next/link"
import type { ReactNode } from "react"

import { buttonVariants } from "@/common/components/ui/button"
import { cn } from "@/lib/utils"

interface OutlookButtonProps {
  href: string
  className?: string
  children?: ReactNode
}

function OutlookIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H14v5.5h-4V14H4V5.5Z" fill="#0F6CBD" />
      <path d="M14 4h4.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H14V4Z" fill="#0078D4" />
      <path d="M10 9.5h10v9A1.5 1.5 0 0 1 18.5 20h-7A1.5 1.5 0 0 1 10 18.5v-9Z" fill="#1490DF" />
      <path
        d="M5.75 8.25h6.5A1.75 1.75 0 0 1 14 10v8a1.75 1.75 0 0 1-1.75 1.75h-6.5A1.75 1.75 0 0 1 4 18v-8a1.75 1.75 0 0 1 1.75-1.75Z"
        fill="#0364B8"
      />
      <path
        d="M9 11.25c-1.38 0-2.5 1.29-2.5 2.88S7.62 17 9 17s2.5-1.29 2.5-2.88-1.12-2.87-2.5-2.87Zm0 4.43c-.72 0-1.3-.7-1.3-1.55s.58-1.55 1.3-1.55 1.3.7 1.3 1.55-.58 1.55-1.3 1.55Z"
        fill="#FFF"
      />
    </svg>
  )
}

export function OutlookButton({
  href,
  className,
  children = "Continue with Outlook",
}: OutlookButtonProps) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "outline", size: "default" }),
        "h-10 w-full gap-2 rounded-lg border-border bg-white px-3 text-foreground shadow-sm hover:bg-muted",
        className
      )}
      href={href}
    >
      <OutlookIcon />
      <span className="truncate">{children}</span>
    </Link>
  )
}
