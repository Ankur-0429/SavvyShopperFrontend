import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SavvyShopper',
  description: 'Get Alerts when Items Get Cheaper',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
          {/* ...other head elements */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID" />
          <Script
            id="my-script"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'YOUR_TRACKING_ID', { page_path: window.location.pathname });
              `,
            }}
          />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
