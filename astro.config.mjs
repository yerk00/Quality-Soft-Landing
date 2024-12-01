// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

import icon from 'astro-icon'

import node from '@astrojs/node'

import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), auth()],
  output: "server",
  adapter: node({
    mode: 'standalone'
  })
})