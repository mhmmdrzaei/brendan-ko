
// sanity.config.js
import { defineConfig } from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { myStructure } from './sanity/struture'
import { iconPicker } from 'sanity-plugin-icon-picker';

export default defineConfig({
  name: 'default',
  title: 'Brendan George Ko ',
  
  projectId: 'yirvbvoo', // Replace with your Sanity project ID
  dataset: 'production',
  
  plugins: [ structureTool({structure:myStructure}) , visionTool(),iconPicker()],
  
  schema: {
    types: schemaTypes,
  },
  
  basePath: '/studio',
})