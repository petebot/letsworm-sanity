import {getCliClient} from 'sanity/cli'

async function migratePromptedBy() {
  const client = getCliClient()

  // Fetch all posts with the old promptedBy structure
  const posts = await client.fetch(`
    *[_type == "post" && defined(promptedBy._ref)]{
      _id,
      _rev,
      title,
      "promptedByPerson": promptedBy._ref,
      "authorId": author._ref,
      "illustratorId": illustrator._ref
    }
  `)

  console.log(`Found ${posts.length} posts with promptedBy person references to migrate`)

  let updated = 0
  let skipped = 0

  for (const post of posts) {
    let newPromptedBy: 'art' | 'writing' | null = null

    // Determine the new promptedBy role
    if (post.promptedByPerson === post.authorId) {
      newPromptedBy = 'writing'
    } else if (post.promptedByPerson === post.illustratorId) {
      newPromptedBy = 'art'
    }

    if (newPromptedBy) {
      try {
        await client.patch(post._id).set({promptedBy: newPromptedBy}).commit()

        console.log(`✓ Updated "${post.title}": promptedBy set to "${newPromptedBy}"`)
        updated++
      } catch (error) {
        console.error(`✗ Failed to update "${post.title}":`, error)
      }
    } else {
      console.log(`⊘ Skipped "${post.title}": Could not determine role`)
      skipped++
    }
  }

  console.log('\n=== Migration Complete ===')
  console.log(`Updated: ${updated}`)
  console.log(`Skipped: ${skipped}`)
  console.log(`Total: ${posts.length}`)
}

migratePromptedBy().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
