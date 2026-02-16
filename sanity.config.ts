import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

const plugins = [structureTool()]

// Vision tool (debug/exploration) only enabled in development
if (process.env.NODE_ENV === 'development') {
  plugins.push(visionTool())
}

export default defineConfig({
  name: 'default',
  title: 'Manuela Rezende Imoveis',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins,

  schema: {
    types: schemaTypes,
  },
})
