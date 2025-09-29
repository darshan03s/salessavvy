# SalesSavvy

A full-stack e-commerce application built with React and TypeScript, featuring user authentication, shopping cart functionality, payment integration, and an admin dashboard for business management.

## Tech Stack

**Frontend:**
- React 19 with TypeScript
- React Router for navigation
- Tailwind CSS 4 for styling
- shadcn/ui components
- Axios for API requests
- React Hook Form with Zod validation
- Razorpay payment integration
- Docker for containerization

**Build Tools:**
- Vite
- pnpm package manager
- Nginx for production serving

## Features

### Customer Features
- User authentication (login/register)
- Browse products by category
- Shopping cart management (add/remove/update quantities)
- Secure checkout with Razorpay payment gateway
- Order history tracking
- Dark/light theme toggle

### Admin Features
- User management (view, edit user details and roles)
- Product management (add, edit, delete products)
- Business analytics dashboard with reports:
  - Overall business summary
  - Yearly revenue reports
  - Monthly performance analysis
  - Daily sales reports
  - Category-wise sales breakdown

## Getting Started

### Prerequisites
- Node.js (v24 or higher recommended)
- pnpm installed globally
- Backend API running (not included in this repository)

### Installation

1. Clone the repository
```bash
git clone https://github.com/darshan03s/salessavvy.git
cd salessavvy
```

2. Install dependencies
```bash
pnpm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_APP_NAME=
VITE_API_URL=
VITE_RZP_KEY_ID=
COMPOSE_PROJECT_NAME=salessavvy-frontend
```

### Development

Run the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build for production:
```bash
pnpm build
```

Preview production build:
```bash
pnpm preview
```

### Docker Deployment

Build and run with Docker Compose:
```bash
docker compose up --build
```

The application will be available at `http://localhost:5173`

Refer backend repository here: https://github.com/darshan03s/salessavvy-backend