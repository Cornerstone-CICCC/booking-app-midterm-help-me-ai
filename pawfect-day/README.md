# 🐾 Pawfect Day — Pet Grooming Online Booking App

> **WD-301 Midterm Project**  
> A full-stack, responsive booking and appointment management web application tailored specifically for **Pawfect Day**, a boutique pet grooming salon. Built with Next.js App Router, TypeScript, Tailwind CSS, and Neon PostgreSQL.

---

## 🔗 Live Deployment & Repository Links

- **Live Application URL**: []()
- **GitHub Repository**: [https://github.com/Cornerstone-CICCC/booking-app-midterm-help-me-ai](https://github.com/Cornerstone-CICCC/booking-app-midterm-help-me-ai)
- **Database**: Hosted PostgreSQL instance on [Neon](https://neon.tech)

---

## 🐱 Team Members & Responsibilities

|   #   | Name                          | GitHub                                             | Role                                                            | Key Contributions                                                                                                                                                                                                                                                                         |
| :---: | :---------------------------- | :------------------------------------------------- | :-------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | **Alejandro Suárez González** | [@ASuarez18](https://github.com/ASuarez18)         | **Tech Lead & Authentication**                                  | Project architecture setup, public/protected route protection, staff session/auth token management, and final release orchestration.                                                                                                                                                      |
| **2** | **Makoto Arata**              | [@maco-ovo](https://github.com/maco-ovo)           | **Backend, Database & Server Actions** / **Booking Management** | Neon PostgreSQL schema migrations & seed data, shared TypeScript types, Model layer (`lib/bookings.ts`), Server Actions CRUD mutations, and server-side validation. Booking Details view, appointment editing, Change Status modal dialog, and destructive Delete Confirmation workflows. |
| **3** | **Joy Kosol**                 | [@JoyIsHappii](https://github.com/JoyIsHappii)     | **Public UI & Design System**                                   | Shared design system tokens (Buttons, Inputs, Modals, Badges), Homepage layout, and Services showcase page.                                                                                                                                                                               |
| **4** | **Togo Yokoyama**             | [@YokoyamaTogo](https://github.com/YokoyamaTogo)   | **Public Booking Flow**                                         | Custom 4-step booking wizard (Details → Pet & Service → Date & Time → Review), multi-step state preservation, and confirmation workflow.                                                                                                                                                  |
| **5** | **Mamede Santana**            | [@mamedesantana](https://github.com/mamedesantana) | **Staff Dashboard UI**                                          | Dashboard layout, dynamic summary KPI cards, search bar, multi-attribute filter controls (Status, Service, Date), and responsive table UI.                                                                                                                                                |
| **6** | **Patricio Caballero**        | [@p4t0110](https://github.com/p4t0110)             |                                                                 |                                                                                                                                                                                                                                                                                           |

---

## 🐾 Chosen Business: Pawfect Day

**Pawfect Day** is a specialized boutique pet grooming salon.

This platform solves these challenges with two core systems:

1. **Public Self-Service Booking (No Login Required)**
2. **Protected Staff Dashboard (Staff Access Only)**

---

## ✨ Key Features & Architecture

### 🐶 1. Public Booking Experience

- **Custom Multi-Step Booking Wizard**:
  - **Step 1: Your Details**: Owner contact info (Name, Email, Phone format validation).
  - **Step 2: Pet & Service**: Pet name, species, breed, size, and grooming service selection.
  - **Step 3: Date & Time**
  - **Step 4: Review & Submit**
- **Reference Number Generation**
- **Server-Side Validation**

### 🔐 2. Protected Staff Dashboard & Booking Management

- **Authentication & Route Protection**: Unauthenticated access to `/dashboard/*` immediately redirects to `/login`.
- **Server-Level Mutation Protection**: Every mutation action (`updateBooking`, `changeBookingStatus`, `deleteBooking`) verifies an active staff session on the server side
- **Multi-Attribute Filtering & Search**
- **Complete CRUD Operations**:
  - **View Details**
  - **Edit Appointment**
  - **Status Modal**
  - **Destructive Deletion**

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components & Server Actions)
- **Frontend UI**: [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Database**: PostgreSQL hosted on [Neon](https://neon.tech)
- **Database Driver**: `pg` (Node Postgres Connection Pool) / `@neondatabase/serverless`
- **Language**: TypeScript
- **Deployment Platform**: [Vercel](https://vercel.com)

---

## Getting Started (Local Development)

### 1. Prerequisites

- Node.js (v20+ recommended)
- Access to a Neon PostgreSQL instance

