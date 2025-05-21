# Student Portfolio Website

A full-stack web application for students to create and manage their digital portfolios. Users can register, sign in, add/edit/delete projects, blogs, and education details, and view their profile. The app uses MongoDB for data storage and NextAuth.js for authentication.

---

## Tech Stack
- **Frontend/Backend:** Next.js (React framework)
- **Database:** MongoDB Atlas (cloud-hosted NoSQL)
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

---

## Features
- User registration and login (NextAuth.js)
- Add, edit, delete projects, blogs, education
- Responsive, accessible design for mobile and desktop
- Clean, modern UI with Tailwind CSS
- Secure data storage with MongoDB Atlas

---

## Getting Started

1. **Clone the Repository**
   ```powershell
   git clone https://github.com/vaishnavithirupathi/student-portfolio-website/
   cd student-portfolio-site
   ```
2. **Install Dependencies**
   ```powershell
   npm install
   ```
3. **Set Up Environment Variables**
   - Create a `.env.local` file in the root directory:
     ```
     MONGODB_URI=your-mongodb-atlas-uri
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your-random-secret
     ```
   - Get your MongoDB URI from MongoDB Atlas.
   - Generate a random secret for NextAuth (can use `openssl rand -base64 32`).
4. **Run the Development Server**
   ```powershell
   npm run dev
   ```
   - Visit http://localhost:3000 in your browser.

---

## Deployment
1. **Push your code to GitHub.**
2. **Go to [vercel.com](https://vercel.com) and sign in.**
3. **Import your GitHub repo as a new project.**
4. **Set environment variables in Vercel dashboard (same as `.env.local`).**
5. **Click Deploy.**
6. **Your site will be live at `https://your-project-name.vercel.app`.**

---

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## License
MIT
