# 🧭 Social WebApp – _React + Next.js Social Feed Project_

A **Next.js 15 / React 19** mock social platform. The app simulates a user feed, profile view, and post interactions using mocked APIs and follows modern UI architecture and component design best practices.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript" />
  <img src="https://img.shields.io/badge/Mantine-7.17-339af0?logo=mantine" />
  <img src="https://img.shields.io/badge/JSON Server-1.0-ffcb05?logo=json" />
</p>

---

## 🌐 Live Demo

> _Demo not deployed yet – run locally via the setup below._

---

## 🎯 Project Purpose

This app was built to showcase:

- A user-centric interface with mocked data and interactions
- Modern UI layout using Mantine components
- Type-safe development with TypeScript
- Component-based architecture and reusable logic
- Mock backend and optimistic UI updates

---

## ✨ Tech Stack

| Layer            | Library             | Purpose                           |
| ---------------- | ------------------- | --------------------------------- |
| **Framework**    | **Next.js 15**      | App routing, SSR-ready foundation |
| **UI System**    | **Mantine**         | Modern, accessible UI components  |
| **Mock Backend** | **JSON Server**     | REST-like mock API                |
| **Forms**        | **React Hook Form** | Simple, scalable forms            |
| **Typing**       | **TypeScript 5**    | Type safety across the codebase   |
| **Quality**      | **ESLint 9**        | Code linting                      |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm i

# Start mock API
npm run api  # runs on http://localhost:3001

# Run the Next.js app
npm run dev  # runs on http://localhost:3000
```

---

## 📂 Project Structure

```
app/
  └─ [userId]/posts/[postId]/page.tsx     ← Post detail view
  └─ [userId]/posts/page.tsx              ← Main user feed
components/
  └─ molecules/
        └─ PostCard/                      ← Post listing card
services/
  └─ posts/api.ts                         ← Mock API logic for posts
  └─ users/api.ts                         ← Mock API logic for users
types/
  └─ index.ts                             ← Shared type definitions
db.json                                   ← Mock user/post/friend data
```

---

## 🗺️ Roadmap

| Phase             | Goal                                                                |
| ----------------- | ------------------------------------------------------------------- |
| **📐 Refactor**   | Extract post interactions and layout logic into hooks and utils     |
| **✅ UI Library** | Full integration with **Mantine** UI toolkit                        |
| **🧪 Testing**    | Planned setup for unit and component testing using **Vitest** + RTL |

---

## 📝 Dev Notes

- Project created to practice and exhibit frontend architecture techniques
- `json-server` used to simulate data persistence and REST endpoints
- Likes use optimistic updates for better UX
- Focused on clean composition, modular structure, and accessibility
