// app/components/Header.js
import Link from 'next/link'
// import { useState } from 'react'

export default function Header({ siteTitle, mainMenu, sideMenu, categories, projects }) {
  // const [openCategory, setOpenCategory] = useState(null)

  // const toggleCategory = (categoryId) => {
  //   setOpenCategory(openCategory === categoryId ? null : categoryId)
  // }

  return (
    <header className="site-header">
        <div className="site-branding">
          <Link href="/">
            <h1>{siteTitle || 'My Site'}</h1>
          </Link>
        </div>
    </header>
  )
}