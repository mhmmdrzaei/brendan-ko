// app/components/Header.js
import Link from 'next/link'

export default function Header({ settings }) {


  return (
    <header className="site-header">
        <div className="site-branding">
          <Link href="/">
            <h1>{settings.siteTitle}</h1>
          </Link>
        </div>
    </header>
  )
}