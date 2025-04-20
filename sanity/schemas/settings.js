// sanity/schemas/settings.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'mainHeadingMenu',
      title: 'Main Heading Menu',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }, { type: 'category' }],
        },
      ],
    }),
    defineField({
      name: 'sideHeadingMenu',
      title: 'Side Heading Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'linkTitle',
              title: 'Link Title',
              type: 'string',
            },
            {
              name: 'linkUrl',
              title: 'Link URL',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Site Settings',
      }
    },
  },
})