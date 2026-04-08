import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: "Let's Worm",

  projectId: 'tukw59bq',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Submission Guidelines')
              .child(
                S.documentTypeList('submissionGuidelines').title('Submission Guidelines Documents')
              ),
            ...S.documentTypeListItems().filter(
              (listItem) => listItem.getId() !== 'submissionGuidelines'
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
