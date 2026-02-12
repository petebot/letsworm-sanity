import {defineField, defineType} from 'sanity'

const buildFullName = (doc: {
  givenName?: string
  middleName?: string
  familyName?: string
  name?: string
}) => {
  if (doc?.name) return doc.name
  return [doc?.givenName, doc?.middleName, doc?.familyName].filter(Boolean).join(' ').trim()
}

export default defineType({
  name: 'author',
  title: 'Contributors',
  type: 'document',
  fields: [
    defineField({
      name: 'givenName',
      title: 'Given Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Given name is required'),
    }),
    defineField({
      name: 'middleName',
      title: 'Middle Name',
      type: 'string',
      description: 'Optional middle name or initial',
    }),
    defineField({
      name: 'familyName',
      title: 'Family Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Family name is required'),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
      description: 'Auto-generated from given, middle, and family names',
      hidden: true,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) =>
          buildFullName(
            doc as {givenName?: string; middleName?: string; familyName?: string; name?: string},
          ),
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      givenName: 'givenName',
      middleName: 'middleName',
      familyName: 'familyName',
      media: 'image',
    },
    prepare(selection) {
      const {name, givenName, middleName, familyName, media} = selection
      const title =
        buildFullName({name, givenName, middleName, familyName}) || 'Unnamed contributor'
      return {title, media}
    },
  },
})
