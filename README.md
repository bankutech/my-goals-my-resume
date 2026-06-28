# MyGoalsMyResuME 🚀

A modern, high-performance, ATS-friendly resume builder designed to help you stand out. Build a resume that opens doors with intelligent guidance and beautiful premium templates.

![Live on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## ✨ Features

- **Live Preview Editor:** See your changes instantly as you type.
- **Multiple Premium Templates:** Choose from beautifully crafted designs, including:
  - Classic ATS
  - Modern Executive
  - Minimal
  - Developer
  - Campus Placement
  - Professional
- **ATS-Optimized:** Built specifically to pass through Applicant Tracking Systems (ATS) cleanly.
- **Serverless Architecture:** Natively configured to run blazing fast on Vercel.

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React (Icons)
- **Backend:** Node.js, Express.js
- **Database:** SQLite (Memory / `/tmp` persistent for Vercel adaptation)
- **Drag & Drop:** `@dnd-kit`

## 🚀 Quick Start (Local Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bankutech/my-goals-my-resume.git
   cd my-goals-my-resume
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   *This uses `concurrently` to launch both the Vite frontend (port 5114) and the Express backend (port 3114) at the same time.*

## ☁️ Deployment

This project is configured out-of-the-box for **Vercel**. 

1. Ensure you have the Vercel CLI installed (`npm i -g vercel`)
2. Run the deployment command:
   ```bash
   vercel --prod
   ```
*Note: Due to Vercel's ephemeral serverless architecture, the local SQLite database resets frequently. For true production persistence, consider migrating the database connection to a cloud provider like Vercel Postgres.*

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

---
*Crafted with precision for modern professionals.*
