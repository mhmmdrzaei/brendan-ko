import { getProject,getsettings } from '@/sanity/sanity.utils';
// import BodyText from '../components/BodyText';
// import CTAButton from '../components/CtaButton';
// import GradientLine from '../components/GradientLine';
// import Heading from '../components/Heading';
// import LogoContainer from '../components/LogoContainer';
// import MembersCarousel from '../components/MembersCarousel';
// import TextImageBox from '../components/TextImageBox';
// import HeadingText from '../components/HeadingText';
import Layout from '@/app/components/layout';
// import HeadingImage from '../components/HeadingImage';

// const componentMap = {
//   heading: Heading,
//   headingText: HeadingText,
//   bodyText: BodyText,
//   logoContainer: LogoContainer,
//   ctaButton: CTAButton,
//   membersCarousel: MembersCarousel,
//   gradientLine: GradientLine,
//   textImageBox: TextImageBox,
//   headingImage: HeadingImage
// };


export async function generateMetadata({ params }) {
  const { slug } =  await params;
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

  const { title, pageBlocks } = pageData;

  return (
    <Layout>
    <div className="page-container">
      {pageBlocks?.map((block) => {
          const BlockComponent = componentMap[block._type];
          if (!BlockComponent) {
            console.warn(`No component for block type: ${block._type}`);
            return null;
          }
          return <BlockComponent key={block._key} {...block} />;
        })}


    </div>
    </Layout>
  );
}
