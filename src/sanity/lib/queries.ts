import { defineQuery } from 'next-sanity'

// GROQ queries will be added in Phase 2 when schemas are defined
export const PLACEHOLDER_QUERY = defineQuery(`*[_type == "placeholder"][0]`)
