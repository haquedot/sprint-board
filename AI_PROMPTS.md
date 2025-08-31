# AI Prompts Used in Sprint Board Development

This document showcases the AI prompting strategies and techniques used during the development of the Sprint Board kanban application. The prompts demonstrate various approaches to problem-solving, code generation, debugging, and feature implementation.

## Table of Contents
- [Initial Setup & Architecture](#initial-setup--architecture)
- [UI/UX Design & Theming](#uiux-design--theming)
- [Responsive Design](#responsive-design)
- [Mobile Interaction](#mobile-interaction)
- [Data Persistence](#data-persistence)
---

## Initial Setup & Architecture

### 1. Project Initialization Prompt
```
Create a modern kanban board application using Next.js 14, TypeScript, and Tailwind CSS. 
The application should have:
- User authentication system
- Task management with CRUD operations
- Drag and drop functionality
- Three columns: Todo, In Progress, Done
- Responsive design for mobile and desktop
- Theme switching (light/dark mode)
- Local storage for data persistence

Please structure the project with proper component organization and type safety.
```

**Technique Used**: Comprehensive requirement specification with technology stack constraints and feature enumeration.

### 2. Component Architecture Prompt
```
Design a React component hierarchy for a kanban board where:
- Each column can contain multiple task cards
- Task cards are draggable between columns
- The board supports optimistic updates
- Components are reusable and follow single responsibility principle

Provide TypeScript interfaces for all data structures including Task, User, and component props.
```

**Technique Used**: Architectural guidance with design principles and TypeScript requirements.

---

## UI/UX Design & Theming

### 3. Theme System Implementation
```
Implement a comprehensive theme system using Tailwind CSS v4 that:
- Uses CSS custom properties for dynamic theming
- Supports both light and dark modes
- Includes semantic color tokens (primary, secondary, accent, etc.)
- Integrates with system preferences
- Persists user choice in localStorage
- Applies smooth transitions between themes

The theme should use neutral colors with good contrast ratios for accessibility.
```

**Technique Used**: Feature-driven prompt with accessibility considerations and technical constraints.

### 4. Color Palette Generation
```
Create a professional, neutral color palette for a productivity application that:
- Works well in both light and dark themes
- Uses modern design trends (similar to Linear, Notion, or GitHub)
- Ensures WCAG AA compliance for text contrast
- Includes semantic colors for success, warning, error states
- Provides subtle accent colors that aren't overwhelming

Format the colors as Tailwind CSS custom properties using RGB values.
```

**Technique Used**: Design-focused prompt with industry references and accessibility standards.

---

## Responsive Design

### 5. Mobile-First Responsive Design
```
Convert this desktop-first kanban board layout to be mobile-first responsive:
- On mobile: Stack columns vertically with smooth scrolling
- On tablet: Show 2 columns side by side
- On desktop: Show all 3 columns horizontally
- Ensure touch targets are at least 44px for mobile accessibility
- Optimize spacing and typography for different screen sizes
- Implement responsive navigation and modals

Use Tailwind CSS responsive prefixes and provide specific breakpoint strategies.
```

**Technique Used**: Progressive enhancement approach with specific accessibility metrics and responsive strategies.

### 6. Modal Responsiveness Prompt
```
Fix modal components to be fully responsive:
- On mobile: Full-screen modals with proper safe areas
- On desktop: Centered modals with max-width constraints
- Ensure form inputs are properly sized for touch devices
- Add proper backdrop handling for mobile browsers
- Implement smooth animations that respect user's motion preferences

The modals should feel native on each device type while maintaining consistent functionality.
```

**Technique Used**: Device-specific UX optimization with performance and accessibility considerations.

---

## Mobile Interaction

### 7. Touch-Based Drag and Drop Implementation
```
The current drag-and-drop implementation uses HTML5 Drag API which doesn't work on mobile devices. 
Implement a touch-based drag-and-drop solution that:
- Detects touch start, move, and end events
- Provides visual feedback during dragging (card follows finger)
- Highlights drop zones when hovering over them
- Works alongside existing desktop drag-and-drop
- Prevents conflicts with scrolling gestures
- Includes haptic feedback where supported

Maintain the existing API structure while adding touch event handlers.
```

**Technique Used**: Problem-specific prompt with backward compatibility requirements and progressive enhancement.

### 8. Cross-Platform Interaction Prompt
```
Create a unified interaction system that handles both:
1. Desktop: Mouse-based drag and drop using HTML5 Drag API
2. Mobile: Touch-based drag and drop using Touch Events

The system should:
- Automatically detect the interaction method
- Provide consistent visual feedback across platforms
- Share the same state management logic
- Gracefully degrade on older browsers
- Include appropriate cursor/touch states

Implement this without breaking existing functionality.
```

**Technique Used**: Cross-platform compatibility prompt with graceful degradation strategy.

---

## Data Persistence

### 9. LocalStorage Integration Prompt
```
The current task management system loses data on page refresh. Implement localStorage persistence that:
- Automatically saves all task changes (create, update, delete, move)
- Loads saved tasks on application startup
- Includes default sample data for first-time users
- Handles serialization/deserialization of complex objects
- Provides utilities for data reset and cleanup
- Works safely in SSR environment (Next.js)

Maintain the existing API interface while adding persistence layer underneath.
```

**Technique Used**: Requirement-driven prompt with technical constraints and backward compatibility.

### 10. Data Migration Strategy
```
Design a data storage system that can evolve over time:
- Version the localStorage schema for future updates
- Provide migration functions for schema changes
- Include data validation and error recovery
- Add utilities for importing/exporting data
- Consider future integration with backend APIs

The system should be robust against data corruption and schema changes.
```

---
