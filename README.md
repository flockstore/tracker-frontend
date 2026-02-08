# Flock - Order Tracker

A modern, real-time order tracking application built with Next.js 14. Allows customers to track their orders using their order ID and email address, providing detailed status updates from multiple carriers.

## Features

- **Real-time Tracking**: Fetches live tracking updates from supported carriers (Coordinadora, Interrapidísimo, Servientrega).
- **Multi-Carrier Support**: Automatically handles tracking numbers from different providers.
- **Order Details**: Displays comprehensive order information including items, customer details, and payment method.
- **Internationalization (i18n)**: Fully localized interface (currently supporting Spanish).
- **Robust Error Handling**: User-friendly error messages for network issues, not found orders, and API failures.
- **Rate Limiting**: Protects the API from abuse with configurable request limits.
- **Retry Logic**: Automatically retries failed tracking requests with exponential backoff.
- **Responsive Design**: Mobile-first UI built with Tailwind CSS and Shadcn components.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)

## Prerequisites

- Node.js 18.17 or later
- npm or yarn or pnpm

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/tracker-next.git
    cd tracker-next
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Configure Environment Variables:**

    Create a `.env.local` file in the root directory and add the following variables:

    ```bash
    # API Configuration
    API_BASE_URL=http://localhost:8080

    # Rate Limiting Configuration
    RATE_LIMIT_WINDOW_MS=60000        # 1 minute window
    RATE_LIMIT_MAX_REQUESTS=5         # Max 5 requests per window

    # Retry Configuration
    TRACKING_MAX_RETRIES=3            # Retry up to 3 times
    TRACKING_RETRY_DELAY_MS=1000      # Initial delay 1 second

    # Support Configuration
    NEXT_PUBLIC_SUPPORT_WHATSAPP_NUMBER=573104314990
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker Support

Build and run the application using Docker:

1.  **Build the image:**

    ```bash
    docker build -t tracker-next .
    ```

2.  **Run the container:**

    ```bash
    docker run -p 3000:3000 \
      -e API_BASE_URL=http://your-api-url \
      -e RATE_LIMIT_WINDOW_MS=60000 \
      -e RATE_LIMIT_MAX_REQUESTS=5 \
      tracker-next
    ```

    *Note: `NEXT_PUBLIC_` variables are inlined at build time. To change them, you must provide them as build args or rebuild the image.*

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm test`: Runs the Jest test suite.
- `npm run test:watch`: Runs tests in watch mode.

## Project Structure

```
tracker-next/
├── __tests__/          # Unit and integration tests
├── actions/            # Server Actions for data fetching
├── app/                # Next.js App Router pages and layouts
├── components/         # Reusable UI components
├── lib/                # Utility functions and shared logic
│   ├── api/            # API client and error handling
│   ├── utils/          # Helper functions (retry, logos, etc.)
│   └── rateLimit.ts    # Rate limiting logic
├── messages/           # i18n translation files
├── public/             # Static assets
├── types/              # TypeScript type definitions
├── views/              # Page view components (business logic)
└── ...config files
```

## Testing

The project includes a comprehensive test suite covering libraries, server actions, and view components.

To run all tests:

```bash
npm test
```

To run a specific test file:

```bash
npm test -- __tests__/path/to/test.ts
```

## License

[MIT](LICENSE)
