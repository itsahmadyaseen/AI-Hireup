# AI-HIREUP Authentication App

A complete Next.js application with user authentication (login/signup) using PostgreSQL database, built with TypeScript and Tailwind CSS.

## Features

- 🔐 User Registration (Sign Up)
- 🔑 User Login
- 🛡️ JWT Authentication
- 🗄️ PostgreSQL Database with Prisma ORM
- 🎨 Beautiful UI matching the provided design
- 📱 Responsive Design
- 🔒 Password Hashing with bcrypt
- ✅ Form Validation
- 🚀 Dashboard after successful login

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Icons**: Heroicons

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn
- PostgreSQL database

## Step-by-Step Setup Instructions

### 1. Clone and Navigate to Project

```bash
cd ai-hireup-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up PostgreSQL Database

#### Option A: Local PostgreSQL Installation

1. Install PostgreSQL on your system:
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - **macOS**: Use Homebrew: `brew install postgresql`
   - **Linux**: Use your package manager: `sudo apt-get install postgresql`

2. Start PostgreSQL service:
   - **Windows**: Use Services or pgAdmin
   - **macOS**: `brew services start postgresql`
   - **Linux**: `sudo systemctl start postgresql`

3. Create a database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ai_hireup_db;

# Create user (optional)
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ai_hireup_db TO your_username;

# Exit
\q
```

#### Option B: Using Docker

```bash
# Run PostgreSQL in Docker
docker run --name ai-hireup-postgres \
  -e POSTGRES_DB=ai_hireup_db \
  -e POSTGRES_USER=your_username \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:15
```

#### Option C: Cloud Database (Recommended for Production)

Use services like:
- [Supabase](https://supabase.com/) (Free tier available)
- [Railway](https://railway.app/)
- [Neon](https://neon.tech/)
- [PlanetScale](https://planetscale.com/)

### 4. Configure Environment Variables

Update the `.env` file with your database credentials:

```env
# Database
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/ai_hireup_db?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"

# JWT
JWT_SECRET="your-jwt-secret-key-here-change-this-in-production"
```

**Important**: Replace the placeholder values with:
- Your actual database credentials
- Strong, unique secret keys for production

### 5. Set Up Database Schema

Run Prisma migrations to create the database tables:

```bash
# Push the schema to your database
npx prisma db push

# Generate Prisma client (already done, but run if needed)
npx prisma generate
```

### 6. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Usage Instructions

### 1. Access the Application

- Open your browser and go to `http://localhost:3000`
- You'll be automatically redirected to the login page

### 2. Create an Account

1. Click "Sign Up" or navigate to `/signup`
2. Fill in the registration form:
   - First Name
   - Last Name
   - Email
   - Password
   - Confirm Password
   - Accept privacy policy
3. Click "Sign Up"
4. Upon successful registration, you'll be redirected to the dashboard

### 3. Login

1. Navigate to `/login` or click "Login"
2. Enter your email and password
3. Click "Login"
4. Upon successful login, you'll be redirected to the dashboard

### 4. Dashboard

- View your user information
- Access quick actions
- See basic statistics
- Logout when needed

## API Endpoints

### Authentication Routes

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Request/Response Examples

#### Sign Up
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

## Database Schema

The application uses a simple User model:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  firstName String
  lastName  String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

## Project Structure

```
ai-hireup-app/
├── src/
│   ├── app/
│   │   ├── api/auth/
│   │   │   ├── login/route.ts
│   │   │   └── signup/route.ts
│   │   ├── dashboard/page.tsx
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   └── lib/
│       ├── auth.ts
│       └── db.ts
├── prisma/
│   └── schema.prisma
├── .env
└── package.json
```

## Security Features

- ✅ Password hashing with bcrypt (12 rounds)
- ✅ JWT token authentication
- ✅ Input validation
- ✅ SQL injection protection (Prisma ORM)
- ✅ Environment variable protection
- ✅ Client-side route protection

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env file
   - Ensure database exists

2. **Prisma Client Error**
   - Run `npx prisma generate`
   - Run `npx prisma db push`

3. **JWT Secret Error**
   - Ensure JWT_SECRET is set in .env file
   - Use a strong, unique secret

4. **Module Not Found Errors**
   - Run `npm install` to ensure all dependencies are installed

### Database Management

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database (caution: deletes all data)
npx prisma db push --force-reset

# View database schema
npx prisma db pull
```

## Production Deployment

### Environment Variables for Production

Ensure you set these environment variables in your production environment:

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
JWT_SECRET="your-production-jwt-secret"
```

### Deployment Platforms

This app can be deployed on:
- [Vercel](https://vercel.com/) (Recommended for Next.js)
- [Netlify](https://netlify.com/)
- [Railway](https://railway.app/)
- [Heroku](https://heroku.com/)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section
2. Review the error logs
3. Ensure all prerequisites are met
4. Verify environment variables are correctly set

---

**Happy coding! 🚀**
