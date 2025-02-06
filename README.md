# Pet Adoption Platform

A modern React-based web application for browsing and matching with adoptable dogs. Built with TypeScript, Redux Toolkit, and Tailwind CSS.

## Features

- 🔍 City-based search with Google Places API integration
- 🎯 Filtering by breed and age
- 💟 Favorite dogs management
- 🔄 Sorting capabilities (breed, age, name)

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Maps Integration**: Google Places API

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with:

```env
VITE_BACKEND_URL=https://frontend-take-home-service.fetch.com
```

4. Start the development server:

```bash
npm run dev
```

## Project Structure

```markdown
src/
├── components/ # Reusable UI components
├── pages/ # Page components
├── store/ # Redux store configuration
├── lib/ # Utility functions and API setup
├── types/ # TypeScript type definitions
└── functions/ # Route loader functions
```
