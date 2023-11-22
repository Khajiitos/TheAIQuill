import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/nav'
import Footer from '@/components/footer'
import GoogleAnalytics from '@/components/google_analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The AI Quill',
  description: 'Blog written by AI',
  authors: [{name: "Khajiitos"}]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GoogleAnalytics trackingID='G-3D9N36NYZ4'></GoogleAnalytics>
      <body className={'bg-green-400 ' + inter.className}>
        <Navigation></Navigation>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
