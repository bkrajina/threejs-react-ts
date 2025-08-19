# Threejs React ts template

This template using threejs inside a react component and tailwind for styling. Vite is used as the bundler.

This type of setup can be reproduced by running the following commands:

`npm create vite@latest`
to get the vite template, after choosing react and ts.

`npm install three`
`npm install -D eslint vite-plugin-glsl`
`npm install tailwindcss @tailwindcss/vite`

Then, configure `vite.config.ts` to include the correct plugins, like:
``` vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glsl(), tailwindcss()],
})```
```

and adding the following to index.css:

`@import "tailwindcss";`
