# Frontend

## Setup instructions

1. is just npm install
2. npm install axios react-router-dom
3. npm run dev
4. insert tailwindcss to these lines vite.config.ts

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite' <<

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], <<
})
```

5. index.css and App.css all clear out and write:

```
@import "tailwindcss"
```

## API endpoint details

1. open a folder called services in src folder
2. using axios library, store the backend URL and all the parameters for each CRUD function
