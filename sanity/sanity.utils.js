import { createClient, groq } from "next-sanity";
import clientConfig from './config/client-config'

// Site Settings Query
export async function getsettings() {
  return createClient(clientConfig).fetch(groq`
    *[_type == "settings"][0]{
      siteTitle,
      siteDescription,
      seoImg { asset->{url} },

      mainHeadingMenu[]->{
        _type,
        _id,
        title,
        slug,
        hexColor,
        parentCategory->{ 
          _id,
          title,
          slug,
          hexColor
        },

"projects": *[_type == "project" && references(^._id)]
  | order(coalesce(menuOrder, title) asc) {
    _id,
    title,
    slug
}
      },

      sideHeadingMenu[]{
        linkTitle,
        linkUrl
      }
    }
  `);
}

export async function getPage(slug) {
  return createClient(clientConfig).fetch(
    groq`*[_type == "page" && slug.current == $slug][0] {
  title,
  slug,
  pageDisplay,
  tiles[]{
    _type == 'singleImage' => {
      _type,
      _key,
      boxHeight,
      spaceBetwen,
      enableHoverSwap,
       hoverImage {
       asset-> {
       _ref,
       _id,
       },
       altText
      },
      slideImage {
        asset->{
          _ref,
          _id,
        },
        caption,
        altText
      }
    },
     _type == 'imageText' => {
      _type,
      _key,
      boxHeight,
      spaceBetwen,
      slideImage1 {
        asset->{
          _ref,
          _id
        },
        caption,
        altText
      },
      slideText[]{
      ...
      }
    },
    _type == 'textItem' => {
      _type,
      _key,
      spaceBetwen,
      lineHeight,
      textAlign,
      slideText[]{
        ...
      }
    },
    _type == 'twoImage' => {
      _type,
      _key,
      boxHeight,
      spaceBetwen,
      enableSwap1,
      enableSwap2,
      swapImage1 {
        asset->{
          _ref,
          _id
        },
        altText
      },
      swapImage2 {
        asset->{
          _ref,
          _id,
        },
        altText
      },
      slideImage1 {
        asset->{
          _ref,
          _id,
        },
        caption,
        altText
      },
      slideImage2 {
        asset->{
          _id,
          _ref,
        },
        caption,
        altText
      }
    },
    _type == 'videoItem' => {
      _type,
      _key,
      boxHeight,
      spaceBetwen,
      videoEmbed,
      showControls
    }
  },
  meta_title,
  meta_description,
  ogImage {
    asset->{
      url
    }
  }
}
`, { slug }
  )
}

// Page Query by Slug
export async function getProject(slug) {
  return createClient(clientConfig).fetch(
    groq`
    *[_type == "project" && slug.current == $slug][0] {
  title,
  slug,
  pageDisplay,
  categories[]->{
    _id,
    title,
    slug
  },
  tiles[]{
    _type == 'singleImage' => {
      _type,
      boxHeight,
      _key,
      enableHoverSwap,
       hoverImage {
       asset-> {
       _ref,
       _id,
       },
       altText
      },
      spaceBetwen,
      slideImage {
        asset->{
          _ref,
          _id,
        },
        caption,
        altText
      }
    },
    _type == 'textItem' => {
      _type,
      _key,
      spaceBetwen,
      lineHeight,
      textAlign,
      slideText[]{
        ...
      }
    },
    _type == 'twoImage' => {
      _type,
      _key,
      boxHeight,
      spaceBetwen,
      enableSwap1,
      enableSwap2,
      swapImage1 {
        asset->{
          _id,
          _ref,
        },
        altText
      },
      swapImage2 {
        asset->{
          _id,
          _ref,
        },
        altText
      },
      slideImage1 {
        asset->{
          _id,
          _ref,
        },
        caption,
        altText
      },
      slideImage2 {
        asset->{
          _id,
          _ref,
        },
        caption,
        altText
      }
    },
    _type == 'videoItem' => {
      _type,
      _key,
      boxHeight,
      spaceBetwen,
      videoEmbed,
      showControls
    },
      _type == 'imageText' => {
    _type,
    _key,
      boxHeight,
      spaceBetwen,
      slideImage1 {
        asset->{
          _ref,
          _id
        },
        caption,
        altText
      },
      slideText[]{
      ...
      }
    },
  },

  meta_title,
  meta_description,
  ogImage {
    asset->{
      url
    }
  }
}

  `, { slug });
}


export async function getCategory() {
  return createClient(clientConfig).fetch(
    groq`
*[_type == "category"] {
  _id,
  title,
  slug,
    hexColor,
  parentCategory->{
    _id,
    title
  },
  projects[]->{
    title,
    slug,
    categories[]->{
      _id,
      title,
      slug
    }
  }
}  

`
  );
}


