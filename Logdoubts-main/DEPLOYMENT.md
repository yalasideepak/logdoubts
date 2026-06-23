# Deployment Guide

## Deploying to Vercel

### Prerequisites
- A Vercel account (free at https://vercel.com)
- GitHub repository connected
- PostgreSQL database (e.g., from Supabase, Railway, or AWS RDS)

### Steps to Deploy

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Select the project root (if prompted)

3. **Configure Environment Variables**
   In the Vercel dashboard, add the following environment variables:
   
   - `DATABASE_URL`: Your PostgreSQL connection string
     - Example: `postgresql://user:password@host.com:5432/database`
   
   - `NEXTAUTH_SECRET`: Generate a secure key
     ```bash
     openssl rand -base64 32
     ```
   
   - `NEXTAUTH_URL`: Set to your deployment URL
     - Example: `https://your-project.vercel.app`

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your project

### Post-Deployment

1. **Run Database Migrations**
   After the first deployment, run:
   ```bash
   vercel env pull
   npx prisma migrate deploy
   ```

2. **Test Authentication**
   - Visit your deployed URL
   - Test the signup and login flow

### Environment Variables Checklist

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NEXTAUTH_SECRET` - Secure random string (32+ characters)
- [ ] `NEXTAUTH_URL` - Your Vercel deployment URL

### Troubleshooting

**Build Fails with Prisma Error**
- Ensure `DATABASE_URL` is set correctly
- Prisma migrations run during build with `prisma generate`

**Authentication Issues**
- Verify `NEXTAUTH_SECRET` is set and consistent
- Check that `NEXTAUTH_URL` matches your deployment domain
- Clear browser cookies and try again

**Database Connection Issues**
- Test your `DATABASE_URL` locally first
- Ensure database server allows connections from Vercel's IP range
- Check database credentials are correct

## Local Development

```bash
npm run dev
```

Visit `http://localhost:3000`

## Building

```bash
npm run build
npm start
```
