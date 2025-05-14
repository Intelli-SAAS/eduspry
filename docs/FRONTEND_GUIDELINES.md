# EduSpry Frontend Guidelines

This document provides comprehensive guidelines for frontend development in the EduSpry platform, ensuring consistency in design, implementation, and user experience.

## 1. Design System

### 1.1 Typography

#### Font Families
- **Primary Font**: Inter
  - Used for all body text, navigation, and general UI elements
- **Secondary Font**: Poppins
  - Used for headings, titles, and emphasis
- **Monospace Font**: JetBrains Mono
  - Used for code blocks and technical content

#### Font Sizes
- **Base Size**: 16px (1rem)
- **Scale**: 1.25 ratio (major third)
  - xs: 0.64rem (10.24px)
  - sm: 0.8rem (12.8px)
  - base: 1rem (16px)
  - lg: 1.25rem (20px)
  - xl: 1.563rem (25px)
  - 2xl: 1.953rem (31.25px)
  - 3xl: 2.441rem (39.06px)
  - 4xl: 3.052rem (48.83px)

#### Font Weights
- **Regular**: 400 - Default body text
- **Medium**: 500 - Emphasis and subheadings
- **Semibold**: 600 - Headings and buttons
- **Bold**: 700 - Primary headings and strong emphasis

#### Line Heights
- **Tight**: 1.2 - Headings
- **Base**: 1.5 - Body text
- **Relaxed**: 1.75 - Long-form content

### 1.2 Color Palette

#### Primary Colors
- **Primary**: `#2563EB` (Blue 600)
  - Hover: `#1D4ED8` (Blue 700)
  - Active: `#1E40AF` (Blue 800)
  - Light: `#DBEAFE` (Blue 100)

#### Secondary Colors
- **Secondary**: `#7C3AED` (Violet 600)
  - Hover: `#6D28D9` (Violet 700)
  - Active: `#5B21B6` (Violet 800)
  - Light: `#EDE9FE` (Violet 100)

#### Neutral Colors
- **Gray 50**: `#F9FAFB` - Background
- **Gray 100**: `#F3F4F6` - Card background
- **Gray 200**: `#E5E7EB` - Borders
- **Gray 300**: `#D1D5DB` - Disabled elements
- **Gray 400**: `#9CA3AF` - Placeholder text
- **Gray 500**: `#6B7280` - Secondary text
- **Gray 600**: `#4B5563` - Body text
- **Gray 700**: `#374151` - Headings
- **Gray 800**: `#1F2937` - High emphasis text
- **Gray 900**: `#111827` - Highest emphasis text

#### Semantic Colors
- **Success**: `#10B981` (Green 600)
- **Warning**: `#F59E0B` (Amber 500)
- **Error**: `#EF4444` (Red 500)
- **Info**: `#3B82F6` (Blue 500)

### 1.3 Spacing System

- **Base Unit**: 4px
- **Scale**:
  - 0: 0px
  - 1: 4px (0.25rem)
  - 2: 8px (0.5rem)
  - 3: 12px (0.75rem)
  - 4: 16px (1rem)
  - 5: 20px (1.25rem)
  - 6: 24px (1.5rem)
  - 8: 32px (2rem)
  - 10: 40px (2.5rem)
  - 12: 48px (3rem)
  - 16: 64px (4rem)
  - 20: 80px (5rem)
  - 24: 96px (6rem)

### 1.4 Border Radius
- **None**: 0px
- **Small**: 4px (0.25rem)
- **Medium**: 6px (0.375rem)
- **Large**: 8px (0.5rem)
- **XL**: 12px (0.75rem)
- **2XL**: 16px (1rem)
- **Full**: 9999px (rounded)

### 1.5 Shadows
- **SM**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **Base**: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`
- **MD**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **LG**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **XL**: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`
- **2XL**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`

## 2. Layout Guidelines

### 2.1 Grid System
- **Base**: 12-column grid
- **Container Widths**:
  - Small: 640px
  - Medium: 768px
  - Large: 1024px
  - XL: 1280px
  - 2XL: 1536px
- **Gutters**: 24px (1.5rem) default

### 2.2 Breakpoints
- **XS**: < 640px (Mobile)
- **SM**: >= 640px (Small tablets)
- **MD**: >= 768px (Tablets)
- **LG**: >= 1024px (Desktops)
- **XL**: >= 1280px (Large desktops)
- **2XL**: >= 1536px (Extra large screens)

### 2.3 Page Structure
- **Header**: 64px height
- **Sidebar**: 250px width (collapsible to 64px)
- **Footer**: 80px height
- **Content Area**: Remaining space
- **Maximum Content Width**: 1200px centered

### 2.4 Component Spacing
- **Section Spacing**: 48px (3rem) vertical separation
- **Card Padding**: 24px (1.5rem)
- **Form Group Spacing**: 24px (1.5rem) between groups
- **Input Padding**: 12px (0.75rem) vertical, 16px (1rem) horizontal

### 2.5 Z-Index Scale
- **Base**: 0
- **Dropdown**: 10
- **Sticky Elements**: 20
- **Fixed Elements**: 30
- **Modal Backdrop**: 40
- **Modal**: 50
- **Popover**: 60
- **Tooltip**: 70
- **Toast**: 80

## 3. Component Guidelines

### 3.1 Buttons

#### Button Sizes
- **Small**: 32px height, 12px padding, 14px font
- **Medium**: 40px height, 16px padding, 16px font
- **Large**: 48px height, 20px padding, 18px font

#### Button Variants
- **Primary**: Solid background with primary color
- **Secondary**: Solid background with secondary color
- **Outline**: Border with transparent background
- **Ghost**: No border, no background, only text color
- **Link**: Looks like a text link but behaves like a button

#### Button States
- **Default**: Base styling
- **Hover**: Slightly darker background
- **Active**: Darker background, slight scale transform
- **Focus**: Focus ring with 2px outline and 2px offset
- **Disabled**: Reduced opacity (0.6), no hover effects

### 3.2 Forms

#### Input Fields
- **Height**: 40px (2.5rem)
- **Padding**: 12px (0.75rem) vertical, 16px (1rem) horizontal
- **Border**: 1px solid Gray 300
- **Border Radius**: Medium (6px)
- **Focus State**: 2px outline with primary color at 0.5 opacity

#### Labels
- **Position**: Above input fields
- **Margin Bottom**: 8px (0.5rem)
- **Font**: Medium weight, Gray 700

#### Helper Text
- **Position**: Below input fields
- **Margin Top**: 4px (0.25rem)
- **Font**: Small size, Gray 500

#### Validation States
- **Error**: Red border, error message in Error color
- **Success**: Green border, optional success message
- **Warning**: Amber border, warning message

### 3.3 Cards

#### Card Structure
- **Padding**: 24px (1.5rem)
- **Border Radius**: Large (8px)
- **Border**: 1px solid Gray 200
- **Background**: White or Gray 50
- **Shadow**: SM shadow

#### Card Variants
- **Basic**: Simple container with padding
- **Interactive**: Hover state with elevation change
- **Featured**: Accent border or background

### 3.4 Navigation

#### Main Navigation
- **Height**: 64px
- **Background**: White or Primary color
- **Text**: Medium weight, Gray 800 or White
- **Active Item**: Bold weight, Primary color or White with indicator

#### Sidebar Navigation
- **Width**: 250px (collapsible)
- **Item Height**: 48px
- **Item Padding**: 16px horizontal
- **Active Item**: Light primary background, primary text color

#### Tab Navigation
- **Height**: 48px
- **Border Bottom**: 1px solid Gray 200
- **Active Tab**: Primary color with 2px indicator

### 3.5 Data Display

#### Tables
- **Header**: Bold text, Gray 700, Gray 100 background
- **Row Height**: 56px
- **Cell Padding**: 16px
- **Border**: 1px solid Gray 200
- **Hover State**: Gray 50 background
- **Striped Variant**: Alternate rows with Gray 50 background

#### Lists
- **Item Padding**: 16px vertical
- **Divider**: 1px solid Gray 200
- **Icon Spacing**: 16px from text

## 4. Accessibility Guidelines

### 4.1 Color Contrast
- **Text**: Minimum contrast ratio of 4.5:1 for normal text, 3:1 for large text
- **UI Components**: Minimum contrast ratio of 3:1 for boundaries of active UI components

### 4.2 Focus States
- All interactive elements must have visible focus states
- Focus indicator should be 2px width in primary color
- Focus should never be removed (no `outline: none` without alternative)

### 4.3 Semantic HTML
- Use appropriate HTML elements for their intended purpose
- Use heading levels correctly (h1-h6) to maintain document hierarchy
- Use lists for groups of related items
- Use buttons for interactive controls that don't navigate
- Use anchors for navigation

### 4.4 ARIA Attributes
- Use ARIA roles, states, and properties when HTML semantics are insufficient
- Ensure all interactive components have appropriate ARIA attributes
- Maintain ARIA landmarks for page regions

### 4.5 Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order should follow visual layout
- Provide keyboard shortcuts for common actions

## 5. Responsive Design Guidelines

### 5.1 Mobile-First Approach
- Start with mobile designs and scale up
- Use min-width media queries
- Optimize tap targets for touch (minimum 44x44px)

### 5.2 Responsive Patterns
- **Stack**: Convert horizontal layouts to vertical on small screens
- **Column Drop**: Drop columns as viewport narrows
- **Off-Canvas**: Move secondary content off-screen on small viewports
- **Reveal**: Show/hide content based on screen size

### 5.3 Responsive Typography
- Use relative units (rem) for font sizes
- Consider reducing heading sizes on mobile
- Maintain minimum 16px font size for body text

### 5.4 Responsive Images
- Use `srcset` and `sizes` attributes for responsive images
- Consider art direction with `<picture>` element
- Optimize image file sizes for different viewports

## 6. Performance Guidelines

### 6.1 Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading for off-screen images
- Use appropriate image dimensions (avoid scaling down large images)

### 6.2 CSS Optimization
- Use CSS custom properties for theme values
- Minimize CSS specificity
- Avoid deeply nested selectors
- Use utility classes for common patterns

### 6.3 JavaScript Performance
- Debounce and throttle event handlers
- Use virtualization for long lists
- Implement code splitting for large applications
- Optimize bundle size with tree shaking

### 6.4 Animation Performance
- Animate only transform and opacity properties when possible
- Use `will-change` property sparingly
- Avoid animating large elements
- Use `requestAnimationFrame` for JavaScript animations

## 7. Code Style Guidelines

### 7.1 File Structure
- One component per file
- Group related components in directories
- Use index files for cleaner imports
- Organize by feature, not by type

### 7.2 Naming Conventions
- **Components**: PascalCase (e.g., `Button.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE
- **CSS Classes**: kebab-case or camelCase (depending on styling solution)

### 7.3 Component Structure
- Props interface at the top
- Destructure props in function parameters
- Group hooks at the beginning of the component
- Extract complex logic to custom hooks
- Use early returns for conditional rendering

### 7.4 Styling Approach
- Use CSS-in-JS or CSS Modules for component styling
- Use utility classes for one-off styling needs
- Maintain consistent naming convention for CSS classes
- Use design tokens for all visual properties

## 8. Documentation Guidelines

### 8.1 Component Documentation
- Document props with TypeScript interfaces
- Include usage examples
- Document component variants
- Note accessibility considerations

### 8.2 Storybook Integration
- Create stories for all components
- Document all component states
- Include accessibility checks
- Provide interactive controls for props

### 8.3 Code Comments
- Comment complex logic
- Use JSDoc for functions and components
- Keep comments up-to-date with code changes
- Focus on why, not what (code should be self-explanatory) 