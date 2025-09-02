# Tcc-Front: Academic Competition Management Dashboard

This project is a management dashboard for academic competitions, designed to help administrators, instructors, and participants manage programming contests and related activities efficiently.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Building for Production](#building-for-production)
- [Testing and Linting](#testing-and-linting)
- [Contributing](#contributing)
- [License](#license)

## Overview
Tcc-Front is a web-based dashboard built with Next.js and TypeScript. It provides tools for managing users, competitions, exercises, rankings, and more, with a modern and responsive UI.

## Features
- User authentication and role-based access
- Competition and exercise management
- Real-time updates via WebSocket
- Ranking and results visualization
- Admin and participant dashboards
- Responsive design with Tailwind CSS

## Project Structure
```
src/
	app/            # Next.js app directory (pages, layouts, API routes)
	components/      # Reusable UI components
	contexts/        # React context providers (e.g., User, Snackbar, WebSocket)
	libs/            # Utility libraries (API client, helpers)
	services/        # Business logic and API service classes
	types/           # TypeScript type definitions
	utilities/       # Utility functions and styled components
public/            # Static assets (images, fonts)
certificates/      # Local development SSL certificates
```

## Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- (Optional) Docker for containerized deployment

## Installation
1. Clone the repository:
	 ```sh
	 git clone https://github.com/gabipataca/Tcc-Front.git
	 cd Tcc-Front
	 ```
2. Install dependencies:
	 ```sh
	 npm install
	 # or
	 yarn install
	 ```

## Running the Project
### Development
To start the development server with HTTPS (using local certificates):
```sh
npm run dev
# or
yarn dev
```
The app will be available at [https://localhost:3000](https://localhost:3000).

> **Note:** Ensure the `certificates/localhost.pem` and `certificates/localhost-key.pem` files exist for local HTTPS. Update your browser to trust these certificates if needed.

### Environment Variables
Create a `.env.local` file in the root directory and add any required environment variables (see `.env.example` if available).

## Building for Production
To build the project for production:
```sh
npm run build
# or
yarn build
```
To start the production server:
```sh
npm start
# or
yarn start
```

## Testing and Linting
- **Linting:**
	```sh
	npm run lint
	# or
	yarn lint
	```
- **Testing:** (add instructions if test scripts are available)


