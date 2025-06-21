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
  name: 'menuOrder',
  title: 'Menu Order',
  type: 'number',
  description: 'Lower numbers appear first in the menu'
}),
    defineField({
        title: 'Page Displays as:',
        name: 'pageDisplay',
        type: 'string',
        options: {
            list: [
                { title: 'Scroll', value: 'scroll' },
                { title: 'Slide', value: 'slide' },
            ],
        },
        initialValue: 'scroll',
        validation: Rule => Rule.required()
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
          title: "Two Image",
          type: "twoImage"
        },
        {
          name: "textItem",
          title: "Text",
          type: "textItem",
        },
        {
          name: "videoItem",
          title: "Video",
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
      title: 'Open Graph Image - [1280x630 min]',
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