import './globals.css'

import Body from './body'

const BASE_URI = process.env.BASE_URI || 'https://localhost:3000'

export const metadata = {
  metadataBase: new URL(BASE_URI),
  title: {
    default: "Ambika Store",
    template: "%s | Ambika Store"
  },
  description: "Wholsale Hardware Store",
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Body>
        {children}
      </Body>
    </html>
  )
}
