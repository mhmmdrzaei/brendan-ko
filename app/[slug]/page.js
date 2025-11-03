import { getPage, getsettings } from "@/sanity/sanity.utils";
import ImageText from "@/app/components/ImageText";
import SingleImage from "@/app/components/SingeImage";
import TextItem from "@/app/components/TextItem";
import Layout from "@/app/components/LayoutPage"
import TwoImage from "@/app/components/TwoImage";
import VideoItem from "@/app/components/VideoItem";
import Link from "next/link";
const componentMap = {
  imageText: ImageText,
  singleImage: SingleImage,
  textItem: TextItem,
  twoImage: TwoImage,
  videoItem: VideoItem,
};


export const revalidate = 10800; 

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const settings = await getsettings();
  const page = await getPage(slug);

  const title = `${settings?.siteTitle || ""} | ${page?.meta_title ? `${page.meta_title}` : `${page?.title}`}`;
  const description = page?.meta_description || settings?.siteDescription || "";

  const fallbackImage = settings?.seoImg?.asset?.url || "";
  const seoImage = page?.ogImage?.asset?.url || fallbackImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: seoImage,
      siteName: settings?.siteTitle || "",
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 628,
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seoImage],
    },
  };
}

// This function handles fetching page content based on slug
export default async function Page({ params }) {
  const { slug } = await params;
  const pageData = await getPage(slug);

  if (!pageData) {
    <Layout>
      <div className="not-found">
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link href="/">Go back to home</Link>
      </div>
    </Layout>;
  }
  const { pageDisplay = "scroll", tiles } = pageData;

  return (
    <Layout>
      <>
        <div
          className={`${pageDisplay === "slide" ? "page-slider" : "page-scroller"}`}
        >
          {tiles && (tiles.map((block) => {
            const BlockComponent = componentMap[block._type];
            return BlockComponent ? (
              <BlockComponent key={block._key} value={block} />
            ) : null;
          }))}
        </div>
      </>
    </Layout>
  );
}
