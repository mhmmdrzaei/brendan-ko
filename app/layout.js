
export const metadata = {
  title: 'My Sanity Site',
  description: 'A Next.js site with Sanity CMS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}