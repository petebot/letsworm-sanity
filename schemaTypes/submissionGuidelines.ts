import {defineField, defineType} from 'sanity'

export const submissionGuidelinesType = defineType({
  name: 'submissionGuidelines',
  type: 'document',
  title: 'Submission Guidelines',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Submission Guidelines',
      description: 'This appears as the page heading on the website.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      type: 'text',
      title: 'Intro',
      rows: 3,
      description: 'Short introductory copy that sits below the heading.',
    }),
    defineField({
      name: 'storyToggleLabel',
      type: 'string',
      title: 'Story Toggle Label',
      initialValue: 'Submit Story',
      description: 'Primary toggle label for the written submission mode.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artToggleLabel',
      type: 'string',
      title: 'Art Toggle Label',
      initialValue: 'Submit Art',
      description: 'Primary toggle label for the visual submission mode.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'storyTagline',
      type: 'string',
      title: 'Story Tagline',
      initialValue: 'your story inspires a visual',
      description: 'Shown beneath the header when the story toggle is active.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artTagline',
      type: 'string',
      title: 'Art Tagline',
      initialValue: 'your visual inspires a story',
      description: 'Shown beneath the header when the art toggle is active.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'storyHeading',
      type: 'string',
      title: 'Story Section Heading',
      initialValue: 'Written Submissions',
    }),
    defineField({
      name: 'artHeading',
      type: 'string',
      title: 'Art Section Heading',
      initialValue: 'Visual Submissions',
    }),
    defineField({
      name: 'storyGuidelines',
      type: 'blockContent',
      title: 'Story Guidelines',
      description: 'Rich text content shown when readers choose Submit Story.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artGuidelines',
      type: 'blockContent',
      title: 'Art Guidelines',
      description: 'Rich text content shown when readers choose Submit Art.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Keep this fixed as submission-guidelines so the website route can find it.',
      options: {maxLength: 96},
      initialValue: {
        current: 'submission-guidelines',
      },
      validation: (Rule) =>
        Rule.required().custom((value) =>
          value?.current === 'submission-guidelines'
            ? true
            : 'Slug must remain "submission-guidelines".'
        ),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      storyTagline: 'storyTagline',
      artTagline: 'artTagline',
    },
    prepare(selection) {
      const {title, storyTagline, artTagline} = selection

      return {
        title,
        subtitle: `${storyTagline} / ${artTagline}`,
      }
    },
  },
})

export default submissionGuidelinesType
