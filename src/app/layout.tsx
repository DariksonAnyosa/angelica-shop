import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import { siteConfig } from '../lib/config'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'], // Optional: Adds character to the variable font
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

import { CartProvider } from '@/context/CartContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} font-sans bg-angelica-bg text-angelica-text antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
