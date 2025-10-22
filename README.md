# 🌱 Farmers Market Web Application

## Project Overview

Farmers Market is a full-stack web application designed to connect local farmers with customers in a modern, user-friendly platform. The application enables farmers to showcase their products and customers to discover and purchase fresh local produce.

Built with a **Next.js 14** frontend and **NestJS** backend, powered by **Supabase** for authentication, real-time database, and cloud storage.

**Live Website:** [https://farmermarket-web.vercel.app/](https://farmermarket-web.vercel.app/)  
**Backend Repository:** [https://github.com/Rolens1/farmermarket-api](https://github.com/Rolens1/farmermarket-api)

---

## ✨ Features

### 🔐 Authentication & User Management

- **Secure Authentication**: JWT-based authentication with Supabase Auth
- **Session Management**: Persistent sessions with automatic token refresh
- **Role-based Access**: Separate experiences for buyers and sellers

### 🛍️ Product Management

- **Product Listings**: Create, read, update, and delete product listings
- **Image Upload**: Direct upload to Supabase Storage with preview functionality
- **SEO Optimization**: Dynamic meta tags and Open Graph for product pages
- **Slug-based URLs**: SEO-friendly URLs (e.g., `/product/fresh-organic-tomatoes`)

### 🔍 Discovery & Search

- **Advanced Search**: Search products by name and description
- **Smart Filtering**: Filter by category, price range, and availability
- **Pagination**: Cursor-based pagination for optimal performance
- **URL Persistence**: Search filters preserved in URL for sharing and bookmarking

### 🛒 Shopping Experience

- **Shopping Cart**: Add, remove, and update quantities with optimistic UI
- **Guest & User Carts**: Seamless transition between guest and authenticated carts
- **Persistent Storage**: Cart data saved in localStorage for guests and database for users
- **Real-time Updates**: Cart icon shows current item count

### 🎨 User Interface

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Components**: Radix UI components for accessibility
- **Image Optimization**: Next.js Image component with fallback handling
- **Loading States**: Skeleton screens and loading indicators

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### 1. Clone the repository

```bash
git clone https://github.com/Rolens1/farmermarket-web.git
cd farmermarket-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: For production
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 4. Database Setup

Run these SQL policies in your Supabase SQL editor:

```sql
-- Products table RLS policies
CREATE POLICY "Service role can manage all products" ON products
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Sellers can manage own products" ON products
  FOR ALL USING (auth.uid() = seller_id);

CREATE POLICY "Anyone can view available products" ON products
  FOR SELECT USING (is_available = true);

-- Storage bucket policies
CREATE POLICY "Public can view product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'products');

CREATE POLICY "Anyone can upload product images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'products');
```

### 5. Start Development

```bash
npm run dev
```

Application available at [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Architecture

### Frontend Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── browse/            # Product discovery
│   ├── product/[slug]/    # Dynamic product pages
│   └── dashboard/         # Seller management
├── components/            # Reusable UI components
│   ├── ui/                # Shadcn/ui components
│   ├── ProductCard.tsx    # Product display component
│   └── ImageUpload.tsx    # File upload with preview
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication state
├── hooks/                 # Custom React hooks
│   ├── useCart.ts         # Shopping cart management
│   └── useImageUpload.ts  # File upload logic
└── lib/                   # Utility functions
    ├── api/               # API client functions
    └── utils/             # Helper functions
```

### Key Technologies

| Layer          | Technology                        | Purpose                                 |
| -------------- | --------------------------------- | --------------------------------------- |
| **Frontend**   | Next.js 14, React, TypeScript     | Modern React framework with type safety |
| **Styling**    | Tailwind CSS, Shadcn/ui           | Utility-first CSS and component library |
| **State**      | React Context, useState/useEffect | Client state management                 |
| **API**        | Fetch API, Axios                  | HTTP requests to backend                |
| **Auth**       | Supabase Auth                     | User authentication and sessions        |
| **Storage**    | Supabase Storage                  | Image and file storage                  |
| **Database**   | Supabase PostgreSQL               | Data persistence                        |
| **Deployment** | Vercel                            | Frontend hosting                        |

---

## 🔧 API Integration

### Product Endpoints

```typescript
// Product management
GET    /products           # List all products (with filters)
GET    /products/:slug     # Get product by slug
POST   /products           # Create new product
PUT    /products/:id       # Update product
DELETE /products/:id       # Delete product

// Search & filtering
GET /products?query=organic&category=vegetables&min=5&max=20
```

### Authentication Flow

1. User signs in with Supabase Auth
2. Frontend receives JWT tokens
3. Tokens stored in secure HTTP-only cookies
4. All authenticated requests include Bearer token
5. Automatic token refresh handled by Supabase client

### Image Upload Process

1. User selects image file
2. Frontend validates file type and size
3. File uploaded directly to Supabase Storage
4. Public URL generated and stored with product
5. URL served through Supabase CDN

---

## 🎯 Key Implementation Details

### Shopping Cart Architecture

- **Guest Users**: Cart stored in localStorage
- **Authenticated Users**: Cart synchronized with backend
- **Optimistic Updates**: Immediate UI feedback with rollback on errors
- **Auto-sync**: Guest cart transfers to user account on login

### Search & Discovery

- **URL-based Filters**: Search state preserved in URL parameters
- **Debounced Search**: Optimized performance with search delay
- **Cursor Pagination**: Efficient infinite scrolling
- **Category Filtering**: Dynamic category lists

### SEO Optimization

- **Dynamic Meta Tags**: Product-specific titles and descriptions
- **Open Graph**: Rich social media sharing
- **Structured Data**: Product schema markup ready
- **Slug URLs**: Human-readable product URLs

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Automatic deployment from main branch
npm run build
```

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=https://farmermarket-api.onrender.com
NEXT_PUBLIC_APP_URL=https://farmermarket-web.vercel.app
```

---

## 🛠️ Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run test suite
```

---

## 🎨 Customization

### Adding New Product Categories

Update the category list in:

- `MyListingDialog.tsx` (form dropdown)
- Backend product validation
- Search filter options

### Styling Changes

- Modify Tailwind classes in components
- Update color scheme in `tailwind.config.js`
- Add custom components to `src/components/ui/`

---

## 🔮 Future Enhancements

### Planned Features

- [ ] **Reviews & Ratings**: Customer feedback system
- [ ] **Favorites**: Save products for later
- [ ] **Order Management**: Complete purchase flow
- [ ] **Real-time Chat**: Direct farmer-customer communication
- [ ] **Inventory Management**: Stock level tracking
- [ ] **Multi-language**: Internationalization support
- [ ] **Progressive Web App**: Offline functionality

### Technical Improvements

- [ ] **Performance**: Implement React Query for caching
- [ ] **Testing**: Comprehensive unit and integration tests
- [ ] **Analytics**: User behavior tracking
- [ ] **Accessibility**: WCAG 2.1 compliance audit

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Pierre Rolens Cheridor**

- Frontend: [https://farmermarket-web.vercel.app/](https://farmermarket-web.vercel.app/)
- Backend: [https://github.com/Rolens1/farmermarket-api](https://github.com/Rolens1/farmermarket-api)
- LinkedIn: [Pierre Rolens Cheridor](https://linkedin.com/in/pierre-rolens-cheridor)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
