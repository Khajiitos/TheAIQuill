import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/nav'
import Footer from '@/components/footer'
import GoogleAnalytics from '@/components/google_analytics'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The AI Quill',
  description: 'Blog written by AI - find and suggest interesting content about anything you can think of!',
  authors: [{name: "Khajiitos", url: "https://khajiitos.fun"}],
  creator: "Khajiitos",
  publisher: "GPT-3.5-turbo",
  keywords: ['blog', 'ai', 'openai', 'chatgpt', 'gpt', 'articles', 'user input', 'interactive'],
  robots: {
    index: true,
    follow: true
  },
  metadataBase: new URL('https://theaiquill.site'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = cookies().get('theme')?.value || 'theme-sutac';

  return (
    <html lang="en">
      <GoogleAnalytics trackingID='G-3D9N36NYZ4'></GoogleAnalytics>
      <body className={`overflow-x-hidden bg-background ${inter.className} ${theme}`}>
        <Navigation></Navigation>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
