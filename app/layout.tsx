import "@/app/globals.css"
import { Inter, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Sahyadri Digital Canteen - Order Campus Food Online",
  description:
    "Skip the lines! Order your favorite campus food online from Sahyadri Digital Canteen and pick it up when it's ready.",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} bg-[#F4F6F5] min-h-screen text-gray-900 antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          {/* Apple HIG & Emil Kowalski Sonner Toaster */}
          <Toaster
            position="top-center"
            duration={2200}
            visibleToasts={1}
            offset={14}
            className="!z-[9999]"
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
