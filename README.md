# Sprint Board Lite

A modern, responsive kanban board application for managing sprint tasks, built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

##  Features

### Core Functionality
- **Authentication**: Mock authentication system with localStorage token management
- **Kanban Board**: Three-column layout (Todo, In Progress, Done) with drag & drop functionality
- **Task Management**: Create, update, and move tasks between columns
- **Search & Filter**: Real-time search by title and filter by priority (low/medium/high)
- **Optimistic Updates**: Immediate UI updates with automatic rollback on API failures

### UX Features
- **Dark Mode**: Persistent theme switching with system preference detection
- **Mobile-First Responsive**: Optimized for all screen sizes
- **Loading States**: Skeleton loading components for better UX
- **Error Handling**: Comprehensive error states and user feedback
- **Animations**: Smooth transitions using Framer Motion

### Variant Implementation: Undo Move (a-g)
After moving a task between columns, users see a 5-second "Undo" toast notification. Clicking "Undo" reverts the task to its previous column and sends a PATCH request to the server.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React hooks with custom state management
- **API Layer**: Pure mock API with in-memory data storage
- **Authentication**: Mock localStorage-based auth

## 📦 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sprint-board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - App: http://localhost:3000

##  Usage

1. **Login**: Use any non-empty email and password to authenticate
2. **Create Tasks**: Click "New Task" to add tasks with title, description, and priority
3. **Drag & Drop**: Move tasks between columns by dragging them
4. **Search**: Use the search bar to filter tasks by title
5. **Filter**: Use the priority dropdown to filter by priority level
6. **Undo**: After moving a task, click "Undo" in the toast to revert the move
7. **Dark Mode**: Toggle theme using the moon/sun icon in the header

##  Architecture

### File Structure
```
src/
├── app/                    # Next.js app router pages
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and API layer
└── types/                  # TypeScript type definitions
```

### Key Components
- **AuthGuard**: Route protection component
- **TaskCard**: Individual task display with drag functionality
- **Column**: Kanban column with drop zone
- **CreateTaskModal**: Task creation form
- **SearchAndFilter**: Search and filtering controls
- **UndoToast**: Undo functionality for moved tasks

### Custom Hooks
- **useAuth**: Authentication state management
- **useTasks**: Task operations with optimistic updates
- **useTheme**: Dark mode theme management

##  Mock API Implementation

The application uses a pure in-memory mock API that simulates:
- 10% failure rate for create and update operations
- Network delays (200-300ms) for realistic experience
- RESTful operations without requiring a separate server
- Automatic ID generation and timestamp management

### Mock Data Features
- Pre-populated with sample tasks
- Persistent during the session (resets on page refresh)
- Simulates all CRUD operations
- Error handling and edge cases

##  Implementation Status

### Completed Features
-  Mock authentication with localStorage
-  Protected routes with AuthGuard
-  Drag and drop between columns
-  Optimistic updates with rollback
-  Task creation modal
-  Search by title
-  Filter by priority
-  Mobile-first responsive design
-  Dark mode with persistence
-  Loading skeletons
-  Error states
-  Undo move variant (5-second toast)
-  Framer Motion animations
-  TypeScript throughout
-  API failure simulation (10%)

### Architecture Decisions
1. **Custom Hooks over Context**: Used custom hooks for state management to keep components clean and testable
2. **Optimistic Updates**: Implemented optimistic UI updates for better perceived performance
3. **Component Composition**: Small, focused components for better maintainability
4. **TypeScript First**: Strong typing throughout for better developer experience
5. **Mobile-First CSS**: Responsive design starting from mobile breakpoints
6. **Pure Mock API**: In-memory mock API eliminates need for separate server while maintaining realistic behavior

