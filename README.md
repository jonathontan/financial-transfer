# Financial Transfer Web App

A web application for managing internal financial account transfers. Built with **React**, **Vite**, and **Redux**.

## Features

- View account balance
- Transfer funds between accounts
- Input validation for amounts and account IDs
- Responsive design
- Show/hide account balance
- Error handling for invalid inputs and insufficient funds

## Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) v18+ installed
- npm (comes with Node.js)

## Local Installation

1. **Clone the repository**

```bash
git clone https://github.com/jonathontan/financial-transfer.git
cd your-repo
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a .env file in the root directory and add backend service:

```bash
VITE_BACKEND_SERVICE=http://localhost:8860
```

4. **Run the project**

```bash
npm run dev
```

5. **Build the project**

```bash
npm run build
```
The build output will be in the dist/ folder.

## Assumptions
- Users cannot transfer funds to their own account.
- Users cannot create an account that already exists
- Transaction amounts allow up to 2 decimal places.
- Amounts exceeding account balance are rejected.

## Technical Choices
- **Frontend Framework:** React with Vite for fast development and optimized builds.
- **State Management:** Redux Toolkit to manage global state for accounts, balances, and transactions.

## Tech Stack & Documentations
- [React](https://react.dev/) – Frontend library.
- [React Redux](https://react-redux.js.org/) – State management library for React.
- [Material-UI](https://mui.com/material-ui) – UI component library for React.
- [notistack](https://iamhosseindhv.com/notistack) – Snackbar notifications for React.
- [Iconify](https://iconify.design/) – Icon library and framework.
- [Vite](https://vitejs.dev/) – Development and build tool.
- [Node.js](https://nodejs.org/) – JavaScript runtime.
- [npm](https://www.npmjs.com/) – Package manager.