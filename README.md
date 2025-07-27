# Recipe App

A simple web app for browsing recipes from
[TheMealDB API](https://www.themealdb.com/api.php), built with React and
TypeScript.

## Features

- **Recipes List**: Browse all recipes with search, category filtering, and
  pagination (3 items per page).
- **Recipe Details**: View detailed recipe information, including ingredients,
  instructions, and links.
- **Selected Recipes**: Display selected recipes with combined ingredients
  (summed for same units) and expandable instructions.

## Technologies

- React
- TypeScript
- TanStack Query
- Axios
- Tailwind CSS
- Vite
- ESLint & Prettier

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/recipe-app.git
   cd recipe-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint.
- `npm run format`: Run Prettier.

## Path Aliases

- `@components/_`: Maps to `src/components/_`
- `@services/_`: Maps to `src/services/_`
- `@types/_`: Maps to `src/types/_`

## License

[MIT](LICENSE)
