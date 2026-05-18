import { Geist, Geist_Mono, Montserrat } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/core/providers/theme-provider"
import { cn } from "@/lib/utils"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { TooltipProvider } from "@/common/ui/tooltip"

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        montserrat.variable
      )}
    >
      <body>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_API_GOOGLE_CLIENT_ID as string}
        >
          <TooltipProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </TooltipProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}
