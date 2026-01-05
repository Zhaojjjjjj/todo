# Next.js Todo App

A fast, responsive, and persistent Todo application built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features

-   ✨ **Create**: Add new todo items easily.
-   ✏️ **Edit**: Double-click any todo item to edit its text.
-   🗑️ **Delete**: Remove items you no longer need.
-   ✅ **Toggle**: Mark items as active or completed.
-   🔍 **Filter**: View All, Active, or Completed items.
-   💾 **Persistence**: Data is saved to `localStorage`, so you won't lose your list on refresh.

## Project Structure

```
.
├── app/
│   ├── globals.css      # Core styles
│   ├── layout.tsx       # Root application layout
│   └── page.tsx         # Main application logic and UI
├── components/
│   ├── TodoInput.tsx    # Component for adding new items
│   ├── TodoList.tsx     # List wrapper component
│   ├── TodoItem.tsx     # Individual todo item with edit/delete actions
│   └── Filter.tsx       # Filter buttons (All/Active/Completed)
├── hooks/
│   └── useTodos.ts      # Custom hook for state management & localStorage
└── types/
    └── index.ts         # TypeScript definitions
```

## Running the Project

1. **Install Dependencies**:

    ```bash
    npm install
    ```

2. **Run Development Server**:

    ```bash
    npm run dev
    ```

3. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

## Tech Stack

-   **Framework**: Next.js 16 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **State Management**: React Hooks (`useState`, `useEffect`) without external libraries.
