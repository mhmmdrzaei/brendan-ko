import Image from 'next/image';
import { PortableText } from 'next-sanity';
import { getsettings, getPage } from '@/sanity/sanity.utils';
import Page from './[slug]/page';



export async function generateMetadata() {
  const settings = await getsettings();
  const page = await getPage('home');
  const title = `${settings?.siteTitle || ''} | ${page?.title || ''}`;
  const description = page?.seo?.seoDescription || settings?.siteDescription || '';

  const fallbackImage = settings?.seoImg?.asset?.url || '';
  const seoImage = page?.seo?.seoImage?.asset?.url || fallbackImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: seoImage,
      siteName: settings?.siteTitle || '',
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 628,
        },
      ],
      locale: 'en_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [seoImage],
    },
  };
}

  

export default async function Home() {
  const homeSlug = 'home'; // Or whatever your homepage slug is
  const pageData = await getPage(homeSlug);

  if (!pageData) {
    return <div>Home page not found</div>;
  }

  return <Page params={{ slug: homeSlug }} />;
}
