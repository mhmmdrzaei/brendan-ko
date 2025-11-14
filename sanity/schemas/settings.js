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
        defineType({
          name: "outboundLinkItem",
          title: "Outbound Link",
          type: "object",
          fields: [
            {
              name: "isOutboundLink",
              title: "Is Outbound Link",
              type: "boolean",
              initialValue: true,
              readOnly: true,
            },
            {
              name: "title",
              title: "Link Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "Link Address",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "title", url: "url" },
            prepare({ title, url }) {
              return {
                title,
                subtitle: `Outbound → ${url}`,
              };
            },
          },
        }),
                defineType({
          name: "submenuItem",
          title: "Submenu Item",
          type: "object",
          fields: [
            {
              name: "isSubmenu",
              title: "Is Submenu",
              type: "boolean",
              initialValue: true,
              readOnly: true, // so it's always true for this type
            },
            {
              name: "submenuHeading",
              title: "Submenu Heading",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "submenuItems",
              title: "Submenu Pages",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "submenuPage",
                  fields: [
                    {
                      name: "title",
                      title: "Page Title",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "url",
                      title: "Page URL",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: "submenuHeading" },
            prepare({ title }) {
              return {
                title,
                subtitle: "Submenu",
              };
            },
          },
        }),
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
    defineField({
      name: 'siteDescription',
      title: 'Site Description (for SEO)',
      type: 'text'
    }),
    defineField({
      name: 'seoImg',
      title: 'SEO Image',
      type: 'image'
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