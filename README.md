This is a [Next.js](https://nextjs.org) project with internationalization (i18n) support using [next-intl](https://next-intl-docs.vercel.app/).

## Features

- ✅ Multi-language support (English, French, Spanish)
- ✅ Automatic locale detection via middleware
- ✅ Language switcher component
- ✅ Type-safe translations

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The app will automatically detect your browser's language preference and redirect you to the appropriate locale:

- English: [http://localhost:3000/en](http://localhost:3000/en)
- French: [http://localhost:3000/fr](http://localhost:3000/fr)
- Spanish: [http://localhost:3000/es](http://localhost:3000/es)

## Project Structure

- `app/[locale]/` - All pages are nested under the locale route
- `messages/` - Translation files (en.json, fr.json, es.json)
- `i18n/` - Internationalization configuration
  - `routing.ts` - Locale routing configuration
  - `request.ts` - Server-side locale and message loading
- `middleware.ts` - Handles locale detection and routing
- `components/LanguageSwitcher.tsx` - Component to switch between languages

## Adding Translations

1. Edit the JSON files in the `messages/` folder
2. Use nested keys like `"SECTION.KEY": "Value"`
3. Use the `useTranslations()` hook in your components:

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations();
  return <h1>{t('INTRODUCTION.ROLE')}</h1>;
}
```

## Adding New Locales

1. Add the locale to `i18n/routing.ts`:

```ts
locales: ['en', 'fr', 'es', 'de'], // Add 'de' for German
```

2. Create a new translation file: `messages/de.json`
3. Update the middleware matcher in `middleware.ts` if needed

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
