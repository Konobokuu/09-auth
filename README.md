# NoteHub Auth

🔗 **Live Demo:** https://09-auth-b29e.vercel.app/

A modern notes management application built with Next.js, React, TypeScript and authentication support.

## 📖 About Project

NoteHub Auth is a full-featured frontend application created as part of the GoIT Fullstack Developer course.

The project demonstrates modern React and Next.js development practices, including authentication, protected routes, state management, API communication, client-side rendering, and responsive UI design.

The application allows users to manage notes, authenticate securely, search and filter content, and interact with external APIs through a modern frontend architecture.

---

## ✨ Features

* User authentication
* Protected routes
* Notes management
* Search and filtering
* Pagination
* Responsive design
* API integration
* TypeScript support
* Modern React architecture

---
## 🔐 Authentication Flow

The application uses access and refresh tokens stored in cookies.

Private routes are protected by middleware. If a user is not authenticated, they are redirected to the sign-in page. Public authentication routes redirect authenticated users back to the main application.

The session is checked automatically, and refresh tokens are used to keep the user authorized when possible.

## 🛠 Tech Stack

* Next.js
* React
* TypeScript
* React Query
* Axios
* CSS Modules
* REST API
* Git
* Vercel

---

## 🚀 Live Preview

Visit the deployed application:

https://09-auth-b29e.vercel.app/

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/matafeii/09-auth.git
```

Navigate to the project directory:

```bash
cd 09-auth
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

---

## 🎯 Learning Objectives

This project helped practice:

* Next.js App Router
* Authentication flows
* Protected routes
* TypeScript development
* API integration
* State management
* React Query
* Modern frontend architecture
* Production deployment with Vercel

---

## 📂 Project Structure

```text
app/
components/
lib/
hooks/
types/
public/
```

---

## 👨‍💻 Author

**Tymofii Rodin**

Front-End Developer | React • TypeScript • Next.js

📍 Kraków, Poland

📧 [matafeii38@gmail.com](mailto:matafeii38@gmail.com)

🔗 GitHub: https://github.com/matafeii

🔗 LinkedIn: https://www.linkedin.com/in/tymofii-rodin-0771763b3/

---

## 📌 Project Status

Completed as part of the GoIT Fullstack Developer program and actively maintained for learning and portfolio purposes.
