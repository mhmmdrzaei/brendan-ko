// sanity/schemas/project.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'tiles',
      title: 'Tiles',
      type: 'array',
      group: 'content',
      of: [
        {
          name: "singleImage",
          title: "Single Image",
          type: "singleImage"
        },
        {
          name: "imageText",
          title: "Image & Text",
          type: "imageText"
        },
        {
          name: "twoImage",
          title: "Two Image Slide",
          type: "twoImage"
        },
        {
          name: "textItem",
          title: "Text Slide",
          type: "textItem",
        },
        {
          name: "videoItem",
          title: "Video Slide",
          type: "videoItem"
        }
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'settings',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'meta_title',
      title: 'Meta Title',
      type: 'string',
      group: 'settings',
    }),
    defineField({
      name: 'meta_description',
      title: 'Meta Description',
      type: 'text',
      group: 'settings',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image - [1200x630]',
      type: 'image',
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'ogImage',
    },
  },
})