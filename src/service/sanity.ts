import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  apiVersion: process.env.API_VERSION,
  token: process.env.SECRET_TOKEN,
  useCdn: false
})

export default client
