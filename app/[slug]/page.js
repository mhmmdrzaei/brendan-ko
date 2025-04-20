// app/[slug]/page.js
import { client } from '../lib/sanity'
import Layout from '../components/Layout'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = params
  const page = await client.fetch(`*[_type == "page" && slug.current == "${slug}"][0]`)
  
  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }
  
  return {
    title: page.meta_title || page.title,
    description: page.meta_description,
    openGraph: page.ogImage ? {
      images: [{ url: urlFor(page.ogImage).url() }],
    } : undefined,
  }
}

export async function generateStaticParams() {
  const pages = await client.fetch(`*[_type == "page"]{
    slug
  }`)
  
  return pages.map(page => ({
    slug: page.slug.current,
  }))
}

async function getPage(slug) {
  return await client.fetch(`*[_type == "page" && slug.current == "${slug}"][0]`)
}

export default async function Page({ params }) {
  const { slug } = params
  const page = await getPage(slug)
  
  if (!page) {
    notFound()
  }
  
  return (
    <Layout>
      <div className="page-content">
        <h1>{page.title}</h1>
        {/* You can render the tiles here when you have them */}
      </div>
    </Layout>
  )
}