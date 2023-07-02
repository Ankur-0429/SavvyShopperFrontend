import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SavvyShopper',
  description: 'Get Alerts when Items Get Cheaper',
  image: '../../public/SavvyShopper_Logo.png',
  imageAlt: 'SavvyShopper Logo'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
