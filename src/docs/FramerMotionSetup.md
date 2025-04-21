# Framer Motion Setup Guide

This guide will help you correctly set up and use Framer Motion in the EduSpry project.

## 1. Installation

Framer Motion is already installed in the project, but if you need to reinstall it:

```bash
npm install framer-motion
```

## 2. TypeScript Configuration

Make sure your TypeScript configuration (`tsconfig.json`) includes the necessary settings for Framer Motion:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true
  }
}
```

## 3. Proper Imports

Always import motion components correctly:

```jsx
import { motion } from 'framer-motion';
```

## 4. Using Motion Components

When using motion components, create elements by adding 'motion.' as a prefix to HTML elements:

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  Content here
</motion.div>
```

## 5. Animation Examples

### Basic Fade-in Animation

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Fade in content
</motion.div>
```

### Sliding Animation

```jsx
<motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Slide in content
</motion.div>
```

### Hover and Tap Animations

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Animated Button
</motion.button>
```

### Using Animation Variants

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

return (
  <motion.ul
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {items.map(item => (
      <motion.li key={item.id} variants={itemVariants}>
        {item.text}
      </motion.li>
    ))}
  </motion.ul>
);
```

## 6. Alternative Approach: Using CSS Transitions

If Framer Motion causes issues, you can use CSS transitions as a fallback:

```jsx
<div className="transition-all duration-300 hover:scale-105 active:scale-95">
  Content with CSS transitions
</div>
```

## 7. Debugging Framer Motion Issues

If you encounter errors with Framer Motion:

1. Check for TypeScript errors in the console
2. Ensure you're using the correct syntax for motion components
3. Try using simpler animations first before complex ones
4. Make sure there are no conflicting animation libraries
5. Check for version compatibility with React and TypeScript

## 8. Performance Considerations

- Use `layoutId` for smooth element transitions
- Consider using `AnimatePresence` for exit animations
- Use the `useReducedMotion` hook to respect user preferences
- Avoid animating too many elements simultaneously

By following these guidelines, you can properly integrate Framer Motion into the EduSpry project. 