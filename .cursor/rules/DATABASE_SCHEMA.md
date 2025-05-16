# EduSpry Platform Database Schema

This document outlines the database schema design for the EduSpry educational platform, detailing the structure, relationships, and key attributes of the primary data entities.

## 1. Overview

The EduSpry platform uses a hybrid database approach:

- **PostgreSQL**: For relational data requiring ACID compliance and complex querying
- **MongoDB**: For document-based data with flexible schema requirements
- **Redis**: For caching and real-time data needs

## 2. Core Entity Relationship Diagram

```
┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐
│     User          │       │   Institution     │       │     Course        │
├───────────────────┤       ├───────────────────┤       ├───────────────────┤
│ id (PK)           │       │ id (PK)           │       │ id (PK)           │
│ username          │◄──────┤ name              │◄──────┤ title             │
│ email             │       │ code              │       │ code              │
│ password_hash     │       │ address           │       │ description       │
│ first_name        │       │ phone             │       │ start_date        │
│ last_name         │       │ website           │       │ end_date          │
│ role              │       │ created_at        │       │ credit_hours      │
│ status            │       │ updated_at        │       │ institution_id (FK)│
│ created_at        │       └───────────────────┘       │ department_id (FK)│
│ updated_at        │                                   │ created_at        │
│ institution_id (FK)│                                   │ updated_at        │
└─────────┬─────────┘                                   └─────────┬─────────┘
          │                                                       │
          │                                                       │
          ▼                                                       ▼
┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐
│     Profile       │       │     Class         │       │     Module        │
├───────────────────┤       ├───────────────────┤       ├───────────────────┤
│ id (PK)           │       │ id (PK)           │       │ id (PK)           │
│ user_id (FK)      │       │ section_number    │◄──────┤ title             │
│ avatar            │       │ semester          │       │ description       │
│ bio               │       │ year              │       │ position          │
│ phone             │       │ max_enrollment    │       │ course_id (FK)    │
│ address           │       │ course_id (FK)    │       │ created_at        │
│ preferences       │       │ created_at        │       │ updated_at        │
│ created_at        │       │ updated_at        │       └───────────────────┘
│ updated_at        │       └─────────┬─────────┘                │
└───────────────────┘                 │                          │
                                      │                          │
                                      ▼                          ▼
┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐
│    Enrollment     │       │   ClassTeacher    │       │     Content       │
├───────────────────┤       ├───────────────────┤       ├───────────────────┤
│ id (PK)           │       │ id (PK)           │       │ id (PK)           │
│ student_id (FK)   │       │ class_id (FK)     │       │ title             │
│ class_id (FK)     │       │ teacher_id (FK)   │       │ type              │
│ status            │       │ role              │       │ description       │
│ grade             │       │ created_at        │       │ file_path         │
│ created_at        │       │ updated_at        │       │ module_id (FK)    │
│ updated_at        │       └───────────────────┘       │ created_by (FK)   │
└─────────┬─────────┘                                   │ created_at        │
          │                                             │ updated_at        │
          │                                             └─────────┬─────────┘
          ▼                                                       │
┌───────────────────┐                                             │
│    Attendance     │                                             │
├───────────────────┤                                             ▼
│ id (PK)           │                                   ┌───────────────────┐
│ enrollment_id (FK)│                                   │    Assessment     │
│ date              │                                   ├───────────────────┤
│ status            │                                   │ id (PK)           │
│ notes             │                                   │ title             │
│ created_at        │                                   │ description       │
│ updated_at        │                                   │ type              │
└───────────────────┘                                   │ due_date          │
                                                        │ total_points      │
                                                        │ content_id (FK)   │
                                                        │ created_by (FK)   │
                                                        │ created_at        │
                                                        │ updated_at        │
                                                        └───────────────────┘
```

## 3. Detailed Schema Definitions

### 3.1 User Management Schema

#### 3.1.1 User Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin', 'principal')),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    institution_id UUID REFERENCES institutions(id)
);
```

#### 3.1.2 Profile Table
```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    avatar VARCHAR(255),
    bio TEXT,
    phone VARCHAR(20),
    address TEXT,
    preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 3.1.3 Role Permissions Table
```sql
CREATE TABLE role_permissions (
    id UUID PRIMARY KEY,
    role VARCHAR(20) NOT NULL,
    permission VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (role, permission)
);
```

### 3.2 Institution Schema

#### 3.2.1 Institution Table
```sql
CREATE TABLE institutions (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    website VARCHAR(255),
    settings JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 3.2.2 Department Table
```sql
CREATE TABLE departments (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    institution_id UUID NOT NULL REFERENCES institutions(id),
    head_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (code, institution_id)
);
```

### 3.3 Course Management Schema

#### 3.3.1 Course Table
```sql
CREATE TABLE courses (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    credit_hours INTEGER,
    institution_id UUID NOT NULL REFERENCES institutions(id),
    department_id UUID REFERENCES departments(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (code, institution_id)
);
```

#### 3.3.2 Class Table
```sql
CREATE TABLE classes (
    id UUID PRIMARY KEY,
    section_number VARCHAR(20) NOT NULL,
    semester VARCHAR(20),
    year INTEGER,
    max_enrollment INTEGER,
    course_id UUID NOT NULL REFERENCES courses(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (section_number, course_id, semester, year)
);
```

#### 3.3.3 Class Teacher Table
```sql
CREATE TABLE class_teachers (
    id UUID PRIMARY KEY,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES users(id),
    role VARCHAR(20) DEFAULT 'primary' CHECK (role IN ('primary', 'assistant', 'guest')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (class_id, teacher_id)
);
```

#### 3.3.4 Module Table
```sql
CREATE TABLE modules (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    position INTEGER NOT NULL,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.4 Enrollment and Attendance Schema

#### 3.4.1 Enrollment Table
```sql
CREATE TABLE enrollments (
    id UUID PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES users(id),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'dropped', 'completed', 'waitlisted')),
    grade VARCHAR(5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, class_id)
);
```

#### 3.4.2 Attendance Table
```sql
CREATE TABLE attendance (
    id UUID PRIMARY KEY,
    enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (enrollment_id, date)
);
```

### 3.5 Content and Assessment Schema

#### 3.5.1 Content Table
```sql
CREATE TABLE content (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('document', 'video', 'audio', 'link', 'assignment', 'quiz')),
    description TEXT,
    file_path VARCHAR(255),
    module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 3.5.2 Content Metadata Table (MongoDB Collection)
```json
{
  "_id": "ObjectId",
  "content_id": "UUID",
  "metadata": {
    "duration": "Number",
    "format": "String",
    "size": "Number",
    "dimensions": {
      "width": "Number",
      "height": "Number"
    },
    "tags": ["String"],
    "accessibility": {
      "captions": "Boolean",
      "transcript": "Boolean"
    }
  },
  "settings": {
    "visibility": "String",
    "release_date": "Date",
    "expiry_date": "Date",
    "access_restrictions": ["String"]
  },
  "analytics": {
    "views": "Number",
    "downloads": "Number",
    "average_time_spent": "Number",
    "completion_rate": "Number"
  },
  "created_at": "Date",
  "updated_at": "Date"
}
```

#### 3.5.3 Assessment Table
```sql
CREATE TABLE assessments (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('quiz', 'exam', 'assignment', 'project', 'discussion')),
    due_date TIMESTAMP WITH TIME ZONE,
    total_points DECIMAL(5,2),
    content_id UUID REFERENCES content(id) ON DELETE SET NULL,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 3.5.4 Question Table
```sql
CREATE TABLE questions (
    id UUID PRIMARY KEY,
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL CHECK (type IN ('multiple_choice', 'true_false', 'short_answer', 'essay', 'matching')),
    points DECIMAL(5,2) NOT NULL,
    position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 3.5.5 Question Options Table
```sql
CREATE TABLE question_options (
    id UUID PRIMARY KEY,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN,
    position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 3.5.6 Submission Table
```sql
CREATE TABLE submissions (
    id UUID PRIMARY KEY,
    assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES users(id),
    submitted_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'graded', 'returned')),
    grade DECIMAL(5,2),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (assessment_id, student_id)
);
```

### 3.6 Communication Schema

#### 3.6.1 Message Table
```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY,
    sender_id UUID NOT NULL REFERENCES users(id),
    subject VARCHAR(255),
    body TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 3.6.2 Message Recipients Table
```sql
CREATE TABLE message_recipients (
    id UUID PRIMARY KEY,
    message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES users(id),
    read_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) NOT NULL DEFAULT 'delivered' CHECK (status IN ('delivered', 'read', 'archived', 'deleted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### 3.6.3 Announcement Table
```sql
CREATE TABLE announcements (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES users(id),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CHECK ((class_id IS NULL AND institution_id IS NOT NULL) OR (class_id IS NOT NULL AND institution_id IS NULL))
);
```

### 3.7 Analytics Schema

#### 3.7.1 User Activity Log (MongoDB Collection)
```json
{
  "_id": "ObjectId",
  "user_id": "UUID",
  "action": "String",
  "entity_type": "String",
  "entity_id": "String",
  "details": "Object",
  "ip_address": "String",
  "user_agent": "String",
  "timestamp": "Date"
}
```

#### 3.7.2 Content Interaction Log (MongoDB Collection)
```json
{
  "_id": "ObjectId",
  "user_id": "UUID",
  "content_id": "UUID",
  "interaction_type": "String",
  "duration": "Number",
  "progress": "Number",
  "device_info": "Object",
  "timestamp": "Date"
}
```

#### 3.7.3 Learning Analytics (MongoDB Collection)
```json
{
  "_id": "ObjectId",
  "student_id": "UUID",
  "course_id": "UUID",
  "metrics": {
    "engagement_score": "Number",
    "completion_rate": "Number",
    "average_grade": "Number",
    "time_spent": "Number",
    "login_frequency": "Number",
    "contribution_count": "Number"
  },
  "predictions": {
    "at_risk_score": "Number",
    "estimated_final_grade": "Number",
    "recommended_actions": ["String"]
  },
  "timestamp": "Date"
}
```

## 4. Indexing Strategy

### 4.1 PostgreSQL Indexes

```sql
-- User table indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_institution_id ON users(institution_id);
CREATE INDEX idx_users_role ON users(role);

-- Course table indexes
CREATE INDEX idx_courses_institution_id ON courses(institution_id);
CREATE INDEX idx_courses_department_id ON courses(department_id);
CREATE INDEX idx_courses_code ON courses(code);

-- Class table indexes
CREATE INDEX idx_classes_course_id ON classes(course_id);

-- Enrollment table indexes
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_class_id ON enrollments(class_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);

-- Content table indexes
CREATE INDEX idx_content_module_id ON content(module_id);
CREATE INDEX idx_content_type ON content(type);
CREATE INDEX idx_content_created_by ON content(created_by);

-- Assessment table indexes
CREATE INDEX idx_assessments_content_id ON assessments(content_id);
CREATE INDEX idx_assessments_created_by ON assessments(created_by);
CREATE INDEX idx_assessments_due_date ON assessments(due_date);

-- Submission table indexes
CREATE INDEX idx_submissions_assessment_id ON submissions(assessment_id);
CREATE INDEX idx_submissions_student_id ON submissions(student_id);
CREATE INDEX idx_submissions_status ON submissions(status);
```

### 4.2 MongoDB Indexes

```javascript
// Content Metadata collection indexes
db.content_metadata.createIndex({ "content_id": 1 });
db.content_metadata.createIndex({ "metadata.tags": 1 });

// User Activity Log collection indexes
db.user_activity_log.createIndex({ "user_id": 1, "timestamp": -1 });
db.user_activity_log.createIndex({ "entity_type": 1, "entity_id": 1 });
db.user_activity_log.createIndex({ "timestamp": -1 });

// Content Interaction Log collection indexes
db.content_interaction_log.createIndex({ "user_id": 1, "content_id": 1 });
db.content_interaction_log.createIndex({ "content_id": 1, "interaction_type": 1 });
db.content_interaction_log.createIndex({ "timestamp": -1 });

// Learning Analytics collection indexes
db.learning_analytics.createIndex({ "student_id": 1, "course_id": 1 });
db.learning_analytics.createIndex({ "metrics.engagement_score": -1 });
db.learning_analytics.createIndex({ "predictions.at_risk_score": -1 });
```

## 5. Data Migration and Versioning

### 5.1 Migration Strategy

The EduSpry platform uses a systematic approach to database migrations:

1. **Version Control**: All schema changes are versioned and tracked in migration files
2. **Forward/Backward Compatibility**: Migrations support both upgrade and rollback operations
3. **Data Transformation**: Logic for transforming data between schema versions
4. **Validation**: Pre and post-migration validation to ensure data integrity

### 5.2 Example Migration File

```javascript
// Migration: 20230615001 - Add support for assignment grading rubrics

exports.up = async function(db) {
  // Create rubrics table
  await db.query(`
    CREATE TABLE rubrics (
      id UUID PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
      created_by UUID NOT NULL REFERENCES users(id),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  // Create rubric criteria table
  await db.query(`
    CREATE TABLE rubric_criteria (
      id UUID PRIMARY KEY,
      rubric_id UUID NOT NULL REFERENCES rubrics(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      points DECIMAL(5,2) NOT NULL,
      position INTEGER NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  // Create indexes
  await db.query(`
    CREATE INDEX idx_rubrics_assessment_id ON rubrics(assessment_id);
    CREATE INDEX idx_rubric_criteria_rubric_id ON rubric_criteria(rubric_id);
  `);
};

exports.down = async function(db) {
  // Drop tables in reverse order
  await db.query(`
    DROP TABLE IF EXISTS rubric_criteria;
    DROP TABLE IF EXISTS rubrics;
  `);
};
```

## 6. Database Partitioning Strategy

### 6.1 Horizontal Partitioning (Sharding)

For high-volume tables, the following partitioning strategies are implemented:

#### 6.1.1 User Activity Logs
```javascript
// Partitioning by time range
db.createCollection("user_activity_log_2023Q1", {
  validator: { $jsonSchema: { ... } }
});
db.createCollection("user_activity_log_2023Q2", {
  validator: { $jsonSchema: { ... } }
});

// Shard key
db.user_activity_log_2023Q1.createIndex({ "timestamp": 1, "user_id": 1 }, { unique: false });
```

#### 6.1.2 Content Interaction Logs
```javascript
// Partitioning by institution
db.createCollection("content_interaction_log_inst1", {
  validator: { $jsonSchema: { ... } }
});
db.createCollection("content_interaction_log_inst2", {
  validator: { $jsonSchema: { ... } }
});

// Shard key
db.content_interaction_log_inst1.createIndex({ "institution_id": 1, "timestamp": 1 }, { unique: false });
```

### 6.2 Vertical Partitioning

Some large tables are split vertically to improve performance:

#### 6.2.1 User Profile Data
```sql
-- Core user data (frequently accessed)
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    institution_id UUID REFERENCES institutions(id)
);

-- Extended user data (less frequently accessed)
CREATE TABLE user_extended_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    biography TEXT,
    interests TEXT[],
    skills TEXT[],
    education JSONB,
    certifications JSONB,
    preferences JSONB,
    social_links JSONB
);
```

## 7. Data Archiving Strategy

### 7.1 Archiving Policy

The EduSpry platform implements the following data archiving policies:

1. **Course Data**: Archived 2 years after course completion
2. **User Activity**: Detailed logs archived after 6 months, summary metrics retained
3. **Messages**: Archived after 1 year
4. **Submissions**: Raw submissions archived after 2 years, grades and feedback retained

### 7.2 Archive Tables

```sql
CREATE TABLE archived_courses (
    id UUID PRIMARY KEY,
    original_id UUID NOT NULL,
    course_data JSONB NOT NULL,
    archive_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    archive_reason VARCHAR(50) NOT NULL
);

CREATE TABLE archived_submissions (
    id UUID PRIMARY KEY,
    original_id UUID NOT NULL,
    submission_data JSONB NOT NULL,
    archive_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 8. Database Security

### 8.1 Row-Level Security

```sql
-- Enable row-level security
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Policy for students to see only their own enrollments
CREATE POLICY student_enrollment_policy ON enrollments
    FOR SELECT
    USING (student_id = current_user_id());

-- Policy for teachers to see enrollments for their classes
CREATE POLICY teacher_enrollment_policy ON enrollments
    FOR SELECT
    USING (class_id IN (
        SELECT class_id FROM class_teachers 
        WHERE teacher_id = current_user_id()
    ));
```

### 8.2 Data Encryption

```sql
-- Encrypted columns for sensitive data
CREATE TABLE student_sensitive_data (
    student_id UUID PRIMARY KEY REFERENCES users(id),
    medical_info BYTEA, -- Encrypted with pgcrypto
    financial_data BYTEA, -- Encrypted with pgcrypto
    accommodation_needs BYTEA -- Encrypted with pgcrypto
);
```

## 9. Database Backup Strategy

### 9.1 Backup Schedule

- **Full Database Backup**: Daily
- **Incremental Backup**: Every 6 hours
- **Transaction Log Backup**: Continuous

### 9.2 Retention Policy

- Daily backups: Retained for 2 weeks
- Weekly backups: Retained for 3 months
- Monthly backups: Retained for 1 year
- Yearly backups: Retained for 7 years