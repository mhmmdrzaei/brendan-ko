// app/components/Header.js
import Link from 'next/link'
import { useState } from 'react'

export default function Header({ siteTitle, mainMenu, sideMenu, categories, projects }) {
  const [openCategory, setOpenCategory] = useState(null)

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId)
  }

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="site-branding">
          <Link href="/">
            <h1>{siteTitle || 'My Site'}</h1>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="main-navigation">
          <ul className="main-menu">
            {mainMenu?.map((item) => {
              // Check if the item is a category
              const isCategory = item._type === 'category'
              const categoryProjects = isCategory
                ? projects.filter((project) =>
                    project.categories?.some((cat) => cat._ref === item._id)
                  )
                : []

              return (
                <li key={item._id} className="menu-item">
                  {isCategory ? (
                    <div className="dropdown">
                      <button
                        onClick={() => toggleCategory(item._id)}
                        className="dropdown-trigger"
                        style={{ color: item.hexColor || '#000' }}
                      >
                        {item.title}
                      </button>
                      {openCategory === item._id && categoryProjects.length > 0 && (
                        <ul className="dropdown-menu">
                          {categoryProjects.map((project) => (
                            <li key={project._id}>
                              <Link href={`/projects/${project.slug.current}`}>
                                {project.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link href={`/${item.slug?.current || ''}`}>{item.title}</Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Side Navigation */}
        <div className="side-navigation">
          <ul className="side-menu">
            {sideMenu?.map((item, index) => (
              <li key={index}>
                <a href={item.linkUrl}>{item.linkTitle}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .site-header {
          padding: 1rem 0;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .main-menu, .side-menu {
          list-style: none;
          display: flex;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
        }
        .dropdown {
          position: relative;
        }
        .dropdown-trigger {
          background: none;
          border: none;
          cursor: pointer;
          font-size: inherit;
          padding: 0;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid #eee;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          list-style: none;
          margin: 0;
          padding: 0.5rem 0;
          min-width: 200px;
          z-index: 10;
        }
        .dropdown-menu li {
          padding: 0.5rem 1rem;
        }
        .dropdown-menu a {
          display: block;
          text-decoration: none;
          color: #333;
        }
        .dropdown-menu a:hover {
          color: #0070f3;
        }
      `}</style>
    </header>
  )
}