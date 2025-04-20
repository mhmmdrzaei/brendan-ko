import { createClient, groq } from "next-sanity";
import clientConfig from './config/client-config'

// Site Settings Query
export async function getsettings() {
  return createClient(clientConfig).fetch( groq`
  *[_type == "siteSettings"][0] {
  siteTitle,
  mainHeadingMenu[]->{
    ...,
    _type == 'category' => {
      _id,
      title,
      slug,
      hexColor,
      parentCategory->{
        _id,
        title
      }
    },
    _type == 'page' => {
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
  tiles[]{
    ...,
    _type == 'singleImage' => {
      boxHeight,
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
      boxHeight,
      spaceBetwen,
      slideText[]{
        ...
      }
    },
    _type == 'twoImage' => {
      boxHeight,
      spaceBetwen,
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
  categories[]->{
    _id,
    title,
    slug
  },
  tiles[]{
    ...,
    _type == 'singleImage' => {
      boxHeight,
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
      boxHeight,
      spaceBetwen,
      slideText[]{
        ...
      }
    },
    _type == 'twoImage' => {
      boxHeight,
      spaceBetwen,
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


