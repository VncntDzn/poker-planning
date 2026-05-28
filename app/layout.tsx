import { Geist_Mono, Montserrat } from "next/font/google"

import { AppProviders } from "@/core/providers/app-providers"
import { cn } from "@/lib/utils"
import "./globals.css"

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
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
