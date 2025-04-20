"use client"
// app/components/Layout.js
import { useState, useEffect } from 'react'
import Header from './Header'
import { client } from '../lib/sanity'

export default function Layout({ children }) {
  const [settings, setSettings] = useState(null)
  const [categories, setCategories] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // Fetch settings
    client.fetch(`*[_type == "settings"][0]`).then(settings => {
      setSettings(settings)
    })

    // Fetch categories
    client.fetch(`*[_type == "category"]`).then(categories => {
      setCategories(categories)
    })

    // Fetch projects with categories
    client.fetch(`
      *[_type == "project"]{
        _id,
        title,
        slug,
        categories[]->
      }
    `).then(projects => {
      setProjects(projects)
    })
  }, [])

  return (
    <div className="site-layout">
      {settings && (
        <Header
          siteTitle={settings.siteTitle}
          mainMenu={settings.mainHeadingMenu}
          sideMenu={settings.sideHeadingMenu}
          categories={categories}
          projects={projects}
        />
      )}
      <main className="site-main">{children}</main>
      <style jsx>{`
        .site-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .site-main {
          flex: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
      `}</style>
    </div>
  )
}