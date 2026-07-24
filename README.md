# CONTENT MANAGEMENT SYSYTEM

## About the Project

This project is a simple Content Management System (CMS) that I built as part of my assignment. The goal was to create a secure web application where an administrator can log in and manage website content using complete CRUD (Create, Read, Update, Delete) operations.

While developing this project, I focused on writing clean and modular code, implementing secure authentication, and creating a simple, user-friendly interface.

---

## Technologies Used

### Frontend
- Next.js
- React
- Redux Toolkit
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## Features

- Secure admin login using JWT authentication
- Protected dashboard
- Add new content
- Edit existing content
- Delete content
- View all content
- Logout functionality
- MongoDB database integration
- Responsive user interface

---

## Project Structure

```
cms-assignment/
│
├── frontend/
└── backend/
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cms-assignment.git
```

---

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and add your environment variables.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

---

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
npm run dev
```

The application will run at:

```
http://localhost:3000
```

---

## Demo Login

For testing the application, you can use the following credentials:

**Email**

```
admin@example.com
```

**Password**

```
Admin123
```

---

## What I Learned

Working on this project helped me strengthen my understanding of full-stack development. I gained hands-on experience with JWT authentication, protected routes, REST APIs, MongoDB integration, Redux state management, and connecting a Next.js frontend with an Express backend. It also gave me practical experience in organizing code into reusable components and maintaining a clean project structure.

---

## Future Improvements

If I continue working on this project, I would like to add:

- Search and filtering for content
- Pagination
- Rich text editor for content creation
- Image upload support
- Role-based authentication
- Better notifications and loading indicators

---

## Author

**Vishnu Vardhan B**