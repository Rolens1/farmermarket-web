# Farmers Market Web Application

## Project Overview

Farmers Market is a full-stack web application designed to connect local farmers with customers.  
The platform allows users to browse available products, manage their own listings, and maintain a shopping cart.  
It consists of a Next.js frontend and a NestJS backend, with Supabase providing authentication, database, and storage.

Frontend (this repository) handles the user interface and session management.  
The backend API handles business logic, database operations, and authentication verification.

**Live Website:** [https://farmermarket-web.vercel.app/](https://farmermarket-web.vercel.app/)  
**Backend Repository:** [https://github.com/Rolens1/farmermarket-api](https://github.com/Rolens1/farmermarket-api)

---

## Features

- **User Authentication:** Login and registration through Supabase Auth.
- **Product Management:** Create, update, and delete user-owned product listings.
- **Dashboard:** View and manage all products created by the logged-in user.
- **Public Marketplace:** Browse and search for all products.
- **Shopping Cart:** Add, remove, and view items in the cart.
- **Image Uploads:** Product images stored and served from Supabase Storage.
- **Persistent Session:** Automatic access token refresh with Supabase.
- **Responsive Design:** Mobile-friendly interface built with Tailwind CSS.

---

## Installation Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Rolens1/farmermarket-web.git
cd farmermarket-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a file named `.env` in the project root and add:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=https://farmermarket-api.onrender.com
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

---

## Usage

1. Visit the live site: [https://farmermarket-web.vercel.app/](https://farmermarket-web.vercel.app/)
2. Sign up or log in using Supabase authentication.
3. Browse public product listings from other users.
4. Add products to your shopping cart.
5. Create, edit, or delete your own products from the dashboard.
6. Log out when finished; the session will persist on return.

---

## Technologies Used

| Category        | Technology                                               |
| --------------- | -------------------------------------------------------- |
| Frontend        | Next.js 14 (App Router), React, TypeScript, Tailwind CSS |
| Backend         | NestJS, Prisma ORM                                       |
| Database & Auth | Supabase (PostgreSQL, Authentication, Storage)           |
| Testing         | Vitest                                                   |
| Deployment      | Vercel (Frontend), Render (Backend)                      |

---

## Future Improvements

- Implement a favorites system for users to save preferred products.
- Add product reviews and ratings.
- Introduce real payment and checkout functionality.
- Expand admin features to moderate products and users.
- Add multilingual support (English and French).

---

## License

This project is open-source under the **MIT License**.

---

**Author:** Pierre Rolens Cheridor
**Frontend:** [https://farmermarket-web.vercel.app/](https://farmermarket-web.vercel.app/)
**Backend:** [https://github.com/Rolens1/farmermarket-api](https://github.com/Rolens1/farmermarket-api)
