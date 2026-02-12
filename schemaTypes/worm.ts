import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'worm',
  title: 'Worm',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      validation: (rule) => [
        rule.required().min(10).error('An excerpt of min. 10 characters is required'),
        rule.required().max(100).error("Hey! That's too long, pal!"),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      initialValue: async () => {
        return {
          _type: 'reference',
          _ref: 'e7775278-2daa-41bb-af7a-0cb4868af7a8',
        }
      },
    }),
    defineField({
      name: 'promptedBy',
      title: 'Prompted By Role',
      type: 'string',
      options: {
        list: [
          {title: 'Art (Artist prompted, Author responded)', value: 'art'},
          {title: 'Writing (Author prompted, Artist responded)', value: 'writing'},
        ],
        layout: 'radio',
      },
      description: 'Which discipline initiated this collaboration?',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'illustrator',
      title: 'Illlustrator',
      type: 'reference',
      to: {type: 'author'},
      initialValue: async () => {
        return {
          _type: 'reference',
          _ref: 'b86c021c-01b6-4028-8213-c10514f80ae0',
        }
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'related',
      title: 'Related Stories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'worm'}}],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      authorName: 'author.name',
      authorGivenName: 'author.givenName',
      authorMiddleName: 'author.middleName',
      authorFamilyName: 'author.familyName',
      media: 'mainImage',
    },
    prepare(selection) {
      const {title, media, authorName, authorGivenName, authorMiddleName, authorFamilyName} =
        selection
      const author =
        authorName ||
        [authorGivenName, authorMiddleName, authorFamilyName].filter(Boolean).join(' ')
      return {title, media, subtitle: author && `by ${author}`}
    },
  },
})
