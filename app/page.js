// app/page.js
import { client } from './lib/sanity'
import Layout from './components/Layout'

async function getHomePage() {
  return await client.fetch(`*[_type == "page" && slug.current == "home"][0]`)
}

export default async function Home() {
  const page = await getHomePage()

  return (
    <Layout>
      <div className="home-page">
        <h1>{page?.title || 'Welcome to our site'}</h1>
        {/* You can render the tiles here when you have them */}
      </div>
    </Layout>
  )
}