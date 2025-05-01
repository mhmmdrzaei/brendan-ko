import { getProject,getsettings } from '@/sanity/sanity.utils';
import ImageText from '@/app/components/ImageText';
import SingleImage from '@/app/components/SingeImage';
import TextItem from '@/app/components/TextItem';
import Layout from '@/app/components/layout';
import TwoImage from '@/app/components/TwoImage';
import VideoItem from '@/app/components/VideoItem';
const componentMap = {
  imageText: ImageText,
  singleImage: SingleImage,
  textItem: TextItem,
  twoImage: TwoImage,
  videoItem: VideoItem,
};


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const settings = await getsettings();
  const page = await getProject(slug);

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

  
  

// This function handles fetching page content based on slug
export default async function Page({ params }) {
  const { slug } = await params;
  const pageData = await getProject(slug);

  if (!pageData) {
    return <div>Page not found</div>;
  }

  const { title, tiles } = pageData;

  return (
    <Layout>
    <div className="page-container">
      <h1>{title}</h1>
      {tiles?.map((block) => {
          const BlockComponent = componentMap[block._type];
          if (!BlockComponent) {
            console.warn(`No component for block type: ${block._type}`);
            return null;
          }
          return <BlockComponent key={block._key} value={block} />;

        })}


    </div>
    </Layout>
  );
}
