# 🍔 Swadzo Admin Management Dashboard

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

> **Swadzo Admin** is a sleek, modern administrative dashboard engineered for restaurant managers and administrators. Built with React 19 and Vite, it provides real-time control over food inventory, customer order processing, sales analytics, and security.

---

## 📋 Table of Contents

- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [📂 Project Structure](#-project-structure)
- [💻 Available Scripts](#-available-scripts)
- [🖥️ Core Modules](#️-core-modules)
- [🔒 Security & Authentication](#-security--authentication)
- [📄 License](#-license)

---

## ✨ Key Features

- 🔐 **Secure Admin Authentication**: Single sign-on and token-based admin access control with auto-redirect logic.
- 📊 **Analytics Dashboard**: High-level overview of total orders, revenue analytics, top dishes, and recent operational metrics.
- 🍲 **Food Inventory Management**:
  - **Add Dish**: Interactive creation form with image preview, price, description, and category assignment.
  - **Menu List**: View all active food items with one-click deletion and real-time inventory updates.
- 📦 **Order Logistics Pipeline**: Real-time management of customer orders through status stages:
  `Food Processing` ➡️ `Out for Delivery` ➡️ `Delivered`.
- 🔔 **Instant Feedback**: Toast notifications via `React Toastify` for success and error state confirmations.

---

## 🛠️ Tech Stack

- **Core Framework**: [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **UI & Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Styling**: Vanilla CSS with custom layout modules

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/swadzo-admin.git
   cd swadzo-admin
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory (refer to [Environment Variables](#environment-variables)).

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will run locally at `http://localhost:5174` (or `http://localhost:5173`).

---

## 🔑 Environment Variables

Create a `.env` file in the root of the `Admin` project with the following configuration:

```env
# Backend API Base URL
VITE_BACKEND_URL=https://swadzo-backend.onrender.com

# Customer Frontend Web App URL
VITE_FRONTEND_URL=https://swadzo.netlify.app
```

> **Note**: For local development, set `VITE_BACKEND_URL=http://localhost:4000`.

---

## 📂 Project Structure

```text
Admin/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Icons, logos, and images
│   ├── Components/         # Reusable UI Components
│   │   ├── NavBar/         # Top navigation bar & admin profile
│   │   ├── Sidebar/        # Side navigation drawer
│   │   └── Skeleton/       # Loading placeholder UI
│   ├── Pages/              # Page views / routes
│   │   ├── AddFood/        # Dish creation interface
│   │   ├── Dashboard/      # Analytics overview page
│   │   ├── ListFood/       # Food item inventory list
│   │   ├── Login/          # Admin authentication screen
│   │   └── Orders/         # Order logistics management
│   ├── App.jsx             # Main application layout & routes
│   ├── index.css           # Global stylesheet & design tokens
│   └── main.jsx            # React root DOM entry point
├── .env                    # Environment configuration file
├── eslint.config.js        # ESLint code quality rules
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vite build configuration
```

---

## 💻 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode with Hot Module Replacement (HMR). |
| `npm run build` | Bundles the app into static files for production inside `dist/`. |
| `npm run preview` | Serves the production build locally for testing. |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues. |

---

## 🖥️ Core Modules

1. **Dashboard (`/`)**: Displays live metrics on order count, revenue summaries, and quick action shortcuts.
2. **Add Food (`/add_food`)**: Form interface supporting image file uploads, price input, category selection, and description entry.
3. **Food List (`/list_food`)**: Data table listing all registered items, with image previews and instant deletion handlers.
4. **Orders (`/orders`)**: Administrative order manager showing buyer details, item breakdown, payment status, and status drop-down updater.

---

## 🔒 Security & Authentication

- The admin panel requires a valid administrator JWT token saved in `localStorage`.
- Unauthenticated users attempting to access routes are automatically redirected to the `/login` screen.
- Cross-Origin Resource Sharing (CORS) permissions are strictly configured on the backend server to match `VITE_FRONTEND_URL` and `VITE_BACKEND_URL`.

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

*Part of the **Swadzo Food Delivery Ecosystem**.*

<div align="center">
  <sub>Built with ❤️ by Mirjaj Ajij Milon</sub>
</div>
