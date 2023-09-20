import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Ловим и уничтожаем астероиды',
  description: 'Приложение, в котором можно уничтожить астероид',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
