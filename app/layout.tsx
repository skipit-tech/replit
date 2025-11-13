import type React from "react"
import "./globals.css"
import { DM_Sans } from "next/font/google"
import ClientLayout from "./ClientLayout"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Noto+Sans+Arabic:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${dmSans.variable} font-dm-sans bg-[#0D0B3B] text-white`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
