# Laravel React Feature Management

A web application for managing features with roles, permissions, voting and comments built with Laravel, React, Inertia.js and Server-Side Rendering (SSR).

## Features

1. User registration and authentication
2. Roles and permissions (Admin, Commenter, User)
3. Admin can manage features and their own comments, edit users’ role and vote on features
4. Commenter can manage their own comments and vote on features
5. User can vote on features
6. Features CRUD with pagination and users CRUD with sorting, filtering and pagination
7. Upvote and downvote system for features
8. Comment system for discussion on features

## Local Setup

> [!TIP]
> Ensure your environment is ready. You will need PHP 8.2, Composer and Node.js installed and the commands `php`, `composer`, `node` and `npm` should be available in your terminal.

### 1. Clone the repository

```
git clone <repository-url>
```

### 2. Navigate to the project folder

```
cd <project-folder>
```

### 3. Copy the environment file

```
cp .env.example .env
```

### 4. Configure environment variables 

Open `.env` and update the configuration parameters as needed.

### 5. Install PHP dependencies

```
composer install
```

### 6. Generate the application key

```
php artisan key:generate 
``` 

### 7. Run database migrations and seed dummy data 

```
php artisan migrate --seed
```

### 8. Install JavaScript dependencies

```
npm install
```

### 9. Start the full development environment

```
composer run dev
```

## SSR Setup 

Server-Side Rendering (SSR) improves initial page load performance and SEO by rendering pages on the server before sending them to the client.

After completing the steps above up to step 8, proceed with the following:

### 1. Build the React frontend assets 

```
npm run build
```

### 2. Start the Laravel development server 

```
php artisan serve
```

### 3. Start the Inertia SSR server 

Run this command in a separate terminal to enable server-side rendering (SSR) for your React frontend.

```
php artisan inertia:start-ssr
```

## Test Accounts

Use these accounts to test the application locally:

| Role           | Email                 | Password | Permissions                                                 |
|----------------|-----------------------|----------|-------------------------------------------------------------|
| Admin User     | admin@example.com     | password | Full access to all features, including changing user roles. |
| Commenter User | commenter@example.com | password | Can create and manage own comments and vote on features.    |
| Regular User   | user@example.com      | password | Can vote on features with basic application access.         |
