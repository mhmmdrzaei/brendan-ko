// app/projects/[slug]/page.js
import { client, urlFor } from '../../lib/sanity'
import Layout from '../../components/Layout'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = params
  const project = await client.fetch(`*[_type == "project" && slug.current == "${slug}"][0]`)
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    }
  }
  
  return {
    title: project.meta_title || project.title,
    description: project.meta_description,
    openGraph: project.ogImage ? {
      images: [{ url: urlFor(project.ogImage).url() }],
    } : undefined,
  }
}

export async function generateStaticParams() {
  const projects = await client.fetch(`*[_type == "project"]{
    slug
  }`)
  
  return projects.map(project => ({
    slug: project.slug.current,
  }))
}

async function getProject(slug) {
  return await client.fetch(`*[_type == "project" && slug.current == "${slug}"][0]{
    ...,
    categories[]->
  }`)
}

export default async function Project({ params }) {
  const { slug } = params
  const project = await getProject(slug)
  
  if (!project) {
    notFound()
  }
  
  return (
    <Layout>
      <div className="project-content">
        <h1>{project.title}</h1>
        
        {project.categories && project.categories.length > 0 && (
          <div className="project-categories">
            <h2>Categories:</h2>
            <ul>
              {project.categories.map(category => (
                <li 
                  key={category._id}
                  style={{ color: category.hexColor || 'inherit' }}
                >
                  {category.title}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* You can render the tiles here when you have them */}
      </div>
    </Layout>
  )
}