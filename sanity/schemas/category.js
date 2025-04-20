import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'hexColor',
      title: 'Hex Color',
      type: 'string',
      description: 'Hex color code (e.g., #FF5733)',
      validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/).warning('Please enter a valid hex color code')
    }),
    defineField({
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Select a parent category if this is a subcategory',
      validation: Rule => Rule.optional()
    })
  ],
})
