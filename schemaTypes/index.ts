import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import issue from './issue'
import {heroType} from './heroType'
import {pageType} from './pageType'
import {submissionGuidelinesType} from './submissionGuidelines'

export const schemaTypes = [
  issue,
  pageType,
  submissionGuidelinesType,
  heroType,
  post,
  category,
  author,
  blockContent,
]
