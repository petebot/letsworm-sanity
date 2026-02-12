import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'issue',
  title: 'Issues',
  type: 'document',
  fields: [
    defineField({
      name: 'issueNumber',
      title: 'Issue Number',
      type: 'string',
      description: 'Format: 001, 002, etc.',
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d{3}$/, {
            name: 'issue number',
            invert: false,
          })
          .error('Issue number must be exactly 3 digits (e.g., 001, 002)'),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Display title for the issue (e.g., "THE ARCHIVE")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Auto-generated from issue number',
      options: {
        source: 'issueNumber',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stories',
      title: 'Stories',
      type: 'array',
      description: 'Drag to reorder stories (max 10 per issue)',
      of: [{type: 'reference', to: {type: 'post'}}],
      validation: (Rule) => Rule.max(10).error('Each issue can contain maximum 10 stories'),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Only published issues will be visible on the website',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this issue was published',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      issueNumber: 'issueNumber',
      published: 'published',
    },
    prepare(selection) {
      const {title, issueNumber, published} = selection
      const status = published ? '✓' : '○'
      return {
        ...selection,
        title: `${status} Issue Nº ${issueNumber}: ${title}`,
      }
    },
  },
  orderings: [
    {
      title: 'Issue Number, Newest',
      name: 'issueNumberDesc',
      by: [{field: 'issueNumber', direction: 'desc'}],
    },
    {
      title: 'Issue Number, Oldest',
      name: 'issueNumberAsc',
      by: [{field: 'issueNumber', direction: 'asc'}],
    },
  ],
})
