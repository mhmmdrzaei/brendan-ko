import { createClient, groq } from "next-sanity";
import clientConfig from './config/client-config'

// Site Settings Query
export async function getsettings() {
  return createClient(clientConfig).fetch( groq`
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
      // For categories, include all projects referencing them
      "projects": *[_type == "project" && references(^._id)]{
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
`
  )
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
       url
       },
       altText
      },
      slideImage {
        asset->{
          url
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
          url
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
          url
        },
        altText
      },
      swapImage2 {
        asset->{
          url
        },
        altText
      },
      slideImage1 {
        asset->{
          url
        },
        caption,
        altText
      },
      slideImage2 {
        asset->{
          url
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
      videoEmbed
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
       url
       },
       altText
      },
      spaceBetwen,
      slideImage {
        asset->{
          url
        },
        caption,
        altText
      }
    },
    _type == 'textItem' => {
      _type,
      _key,
      spaceBetwen,
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
          url
        },
        altText
      },
      swapImage2 {
        asset->{
          url
        },
        altText
      },
      slideImage1 {
        asset->{
          url
        },
        caption,
        altText
      },
      slideImage2 {
        asset->{
          url
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
      videoEmbed
    },
      _type == 'imageText' => {
    _type,
    _key,
      boxHeight,
      spaceBetwen,
      slideImage1 {
        asset->{
          url
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


