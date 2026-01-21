export const metadata = {
  title: 'Chelita',
  description: 'Chelita Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
