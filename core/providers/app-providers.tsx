"use client"

import * as React from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { TooltipProvider } from "@/common/ui/tooltip"
import { ThemeProvider } from "@/core/providers/theme-provider"

type AppProvidersProps = Readonly<{
  children: React.ReactNode
}>

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_API_GOOGLE_CLIENT_ID as string}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </TooltipProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}
