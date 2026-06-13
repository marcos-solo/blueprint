# Blueprint Legal

Blueprint Legal is a Laravel + Inertia + React web application for a boutique Tanzanian legal advisory service.

## Overview

This project combines:
- Laravel 11 backend
- Inertia.js with React frontend
- Tailwind-inspired custom CSS layout
- Admin console with a collapsible sidebar
- Client-facing website with public pages and booking/contact interactions
- Seeded sample users, consultations, and blog content

## Key Features

- Public navigation with home, about, expertise, blog, and contact
- Admin portal with dedicated sidebar and partner console experience
- Collapsible admin sidebar for compact dashboard navigation
- Shared profile page and admin pages using the main app layout
- Navigation loader overlay to show route transitions
- Seeded admin and client accounts for easy testing

## Local Setup

1. Clone the repository:

```bash
git clone <repo-url> blueprint
cd blueprint
```

2. Install PHP dependencies:

```bash
composer install
```

3. Install npm dependencies:

```bash
npm install
```

4. Copy the environment file and generate an application key:

```bash
cp .env.example .env
php artisan key:generate
```

5. Configure your database in `.env`.

6. Run migrations and seed the database:

```bash
php artisan migrate:fresh --seed
```

7. Build assets for development:

```bash
npm run dev
```

8. Start the Laravel development server:

```bash
php artisan serve
```

## Admin / Demo Accounts

- Admin user:
  - Email: `admin@blueprintlegal.co.tz`
  - Password: `password`

- Client user:
  - Email: `client@corporate.com`
  - Password: `password`

## Scripts

- `npm run dev` — start Vite development server
- `npm run build` — build production assets
- `php artisan serve` — serve the Laravel app locally
- `php artisan migrate:fresh --seed` — reset and seed the database

## Project Structure

- `app/` — Laravel backend code
- `resources/js/` — Inertia + React frontend pages, layouts, and components
- `resources/css/` — application styling
- `routes/web.php` — application routes
- `database/seeders/DatabaseSeeder.php` — seeded admin, client, consultations, and blog content
- `public/` — built frontend assets and entry point

## Notes

- The profile page is now rendered through the shared application layout.
- The admin view includes a dedicated console with its own sidebar and header.
- The navigation loader shows during Inertia page transitions for user feedback.

## License

This project is available under the [MIT License](https://opensource.org/licenses/MIT).
