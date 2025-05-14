# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/34a05c70-d941-4dcf-964f-5f30ca4802aa

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/34a05c70-d941-4dcf-964f-5f30ca4802aa) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/34a05c70-d941-4dcf-964f-5f30ca4802aa) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Prompt

Create a comprehensive MVP codebase for a web application targeting Pre-University College (PUC) students in India preparing for competitive exams like JEE, NEET, and CET. This SaaS application will serve multiple educational institutions with robust data isolation between colleges.

## Core Requirements and Architecture

Design a multi-tenant application using Django (backend) and React (frontend) with the following specifications:

1. **Multi-tenancy Implementation**:
   - Create a PostgreSQL database schema with proper tenant isolation
   - Implement Row-Level Security policies that ensure colleges can only access their own data
   - Design authentication using JWT with tenant context embedded in tokens

2. **User Roles and Access Control**:
   - Student: Limited to personal dashboard, test taking, and viewing results
   - Teacher: Test creation, student performance monitoring, content management
   - Principal: Institution-wide analytics and administrative controls

3. **Core Database Models**:
   - Tenants (educational institutions)
   - Users (with role-based permissions)
   - Questions (categorized by subject, topic, difficulty)
   - Tests (collections of questions with scheduling parameters)
   - Submissions (student answers and scores)
   - Performance metrics (time-series data for analytics)

## MVP Features to Implement

### 1. Question Bank and Test Management
Generate code for a system that allows teachers to:
   - Upload educational content as PDFs/Documents
   - Create multiple-choice questions manually
   - Assemble these questions into tests with timing parameters
   - Include proper database models and API endpoints

### 2. Student Testing Interface
Develop a secure examination environment that:
   - Presents questions one at a time or in paginated format
   - Tracks time spent on each question
   - Implements basic anti-cheating measures (fullscreen detection and alerts)
   - Auto-submits when time expires
   - Provides instant scoring upon completion

### 3. Analytics Dashboard
Create basic visualizations for:
   - Students: Personal performance across subjects and topics
   - Teachers: Class/section performance on specific tests and topics
   - Principals: Institution-wide metrics compared to configured benchmarks

## Technical Implementation Details

### Backend (Django)
1. Create a Django project with these apps:
   - accounts (user management)
   - tenants (multi-tenancy)
   - exams (question bank and test management)
   - analytics (reporting)

2. Implement the following Django REST Framework API endpoints:
   - Authentication and user management endpoints
   - CRUD operations for tests and questions
   - Test submission and grading
   - Analytics data retrieval

### Frontend (React)
1. Create separate interfaces for:
   - Student dashboard and test-taking
   - Teacher content management and reporting
   - Principal administrative console

2. Implement these key components:
   - Authenticated routing with role-based access
   - Test creation wizard for teachers
   - Examination interface for students
   - Dashboard visualizations using Chart.js or similar

### Database Implementation
Provide SQL schema definitions for PostgreSQL, including:
   - Table definitions with proper foreign key relationships
   - Row-Level Security (RLS) policies for tenant isolation
   - Indexes for performance optimization

### Security Measures
Implement these basic security features:
   - JWT authentication with proper expiration and refresh mechanisms
   - Password hashing and storage best practices
   - CORS configuration for API protection
   - Input validation and sanitization

## Code Structure and Organization

Structure the output as follows:
1. Project setup instructions (requirements.txt, package.json)
2. Backend code (Django project and apps)
3. Frontend code (React application)
4. Database scripts (migrations, initial data)
5. Deployment instructions for local development

For each major component, include:
- Complete code with proper documentation
- Brief explanation of design choices
- Notes on scaling considerations

Please organize the code in a modular fashion, following best practices for Django and React development. Include comprehensive docstrings and comments to make the codebase maintainable.

## Lovable Thoght Process :
I'd be excited to help you build this comprehensive MVP for a web application targeting PUC students in India! Let's create an educational platform that can help students prepare for competitive exams like JEE, NEET, and CET while providing powerful tools for educators.

Before diving into implementation, let me outline my vision for this project:

Design Inspiration
I'll draw inspiration from successful educational platforms like:

Khan Academy's clean interface with focus on content
Coursera's structured learning paths
Unacademy's exam-specific preparation features
Google Classroom's simplicity for teachers
Features for First Version
Multi-tenant architecture with proper data isolation
Role-based access control (student, teacher, principal)
Question bank and test creation system
Secure test-taking environment
Basic analytics dashboards for all user types
Authentication with JWT and tenant context
Visual Design Elements
Color Palette: Educational blues (#1E88E5, #0D47A1) with accent colors for different subjects
Typography: Clear, readable fonts (Poppins for headings, Inter for body text)
Layout: Responsive design with focus on mobile usability for students
UI Components: Clean, minimal interface with contextual help elements
Let's build this step by step, starting with project setup and core architecture!



Restore
Preview

Implement multi-tenant SaaS application
View code
I've created a foundation for your educational SaaS platform targeting PUC students in India. This MVP includes:

Core Architecture:

Multi-tenant structure with authentication context
JWT implementation with tenant context
Role-based access control for students, teachers, and principals
Comprehensive type definitions for the entire application
UI Components:

Responsive layout with role-specific navigation
Educational blue-themed design system
Specialized components for the educational context
Student Features:

Dashboard with performance metrics
Test-taking environment with anti-cheating measures
Comprehensive test results with explanations
Performance analytics with subject-wise breakdown
The frontend implementation demonstrates how the application would work, with:

Fullscreen test-taking environment with timer and anti-cheating detection
Detailed test result reviews with explanations
Performance analytics with visualizations
Role-based sidebar navigation
I've created placeholders for the teacher and principal pages. To complete the implementation, we would need to:

Build the teacher interface for question/test management
Create the principal analytics dashboard
Implement the backend Django API with PostgreSQL and row-level security
Develop the API integration for the frontend
Would you like me to continue implementing the teacher interface and question bank functionality in a follow-up request?

What's next?
Refine & Customize: Tweak the design, animations, and layouts via prompts or visual edits.
Master Prompting: Use clear, detailed, and iterative prompts for better outcomes.
GitHub Sync: Transfer your project's code to GitHub for two-way sync of edits.
Debug with Ease: Activate our experimental "chat mode" to troubleshoot issues quickly.
Add project knowledge: Set key context or custom instructions you want to include in every edit in this project.
Given the complexity of this project, with multi-tenancy, user roles, and extensive backend and frontend requirements, consider these integrations:

Backend & Database Setup: The Django backend necessitates a robust database connection. Supabase can handle user authentication and provide a quick way to interact with Postgres.

Frontend Framework: Integrating React and a state management library (like Redux or Context API) can streamline front-end development. Supabase can also act as a useful backend if you need to prototype.

Content Delivery: Consider integrating a Content Delivery Network (CDN) for serving static assets and files used in the educational content.

If your project requires backend functionality for multi-tenancy, user roles, database schema, and authentication, use the Supabase menu on the top right to connect your project to Supabase.

## Virtual Classroom Features

The application now includes a comprehensive virtual classroom with the following features:

### 1. Interactive Whiteboard
- Annotation tools for drawing, highlighting, and text
- Formula/equation support using LaTeX syntax
- Screen sharing capability
- Session recording and playback

### 2. Breakout Rooms
- Create and manage multiple breakout rooms
- Drag-and-drop interface for assigning students
- Teacher monitoring capabilities
- Auto-assign feature for quick group creation

### 3. Live Polls/Quizzes
- Create polls with multiple-choice options
- Set time limits for responses
- Mark correct answers for quiz functionality
- Real-time results display with charts

### 4. Recording & Replay
- Record classroom sessions
- Automatic saving for offline access
- Download recordings in standard format
- Replay sessions with synchronized whiteboard content

### 5. Attendance Automation
- Facial recognition-based attendance tracking
- QR code attendance option
- Manual attendance management
- Export attendance reports to CSV

## Technical Implementation

The virtual classroom features are implemented using:

- **Video Conferencing**: Agora.io SDK for low-latency video streaming
- **Interactive Whiteboard**: Excalidraw for the collaborative drawing canvas
- **LaTeX Support**: KaTeX for rendering mathematical equations
- **Facial Recognition**: face-api.js for browser-based face detection
- **UI Components**: React with Tailwind CSS and shadcn/ui

## Setup Instructions

To use the facial recognition feature, you need to download the face-api.js models:

1. Download the models from: https://github.com/justadudewhohacks/face-api.js/tree/master/weights
2. Place the models in the `/public/models` directory of the project

For Agora.io video conferencing:

1. Sign up for an Agora.io account at https://www.agora.io/
2. Create a new project in the Agora Console
3. Copy your App ID to the `AGORA_APP_ID` constant in the VirtualClassroom component
4. For production, generate and use a token from the Agora server

