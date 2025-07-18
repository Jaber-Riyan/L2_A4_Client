# LibraNova 📚

A **Minimal Library Management System** built with **React**, **Redux Toolkit Query (RTK Query)**, and **TypeScript**, designed to handle book inventory and borrowing functionality efficiently. LibraNova features a clean UI, proper state management, and a robust connection with RESTful APIs for book and borrow data.

> Live Site: [libra-nova.netlify.app](https://libra-nova.netlify.app)

---

## 🌐 Tech Stack

**Frontend:**

- React 19
- TypeScript
- React Router v7
- Redux Toolkit + RTK Query
- Tailwind CSS 4
- Radix UI
- Lucide Icons
- sweetalert2 (Toast Notifications)
- Axios

**Backend:**

- Node.js + Express.js
- MongoDB + Mongoose

---

## 🚀 Features

### 1. Public Access

- No authentication required
- All pages and actions are available to any user

### 2. Book Management 📄

- **Book List**: Table with columns - Title, Author, Genre, ISBN, Copies, Availability, and Actions
- **Add Book**: Form to add a new book to the system
- **Edit Book**: Edit existing book details
- **Delete Book**: Remove a book after confirmation
- **Borrow Book**: Borrow available books by quantity and due date

### 3. Borrow Functionality 💼

- Quantity cannot exceed available copies
- Automatically marks book as unavailable when copies reach 0
- Success message and redirection to borrow summary page after borrowing

### 4. Borrow Summary Page 📅

- Aggregated summary of borrowed books
- Shows Book Title, ISBN, and Total Quantity Borrowed

### 5. Routing Pages 🔎

| Page           | Path              |
| -------------- | ----------------- |
| All Books      | `/books`          |
| Add New Book   | `/create-book`    |
| View Book      | `/books/:id`      |
| Edit Book      | `/edit-book/:id`  |
| Borrow Book    | `/borrow/:bookId` |
| Borrow Summary | `/borrow-summary` |

---

## 📝 UI/UX

- Minimalist and clean design with Tailwind CSS
- Fully responsive for mobile, tablet, and desktop
- Smooth navigation and clear CTA buttons
- Type-safe forms using React-Hook-Form and Zod

---

## 🌟 Bonus Implementations

| Feature                                | Status |
| ---------------------------------------| ------ |
| Optimistic UI Updates                  | ✅      |
| Toast Notifications (sweetalert2)      | ✅      |
| Fully Responsive Layout                | ✅      |
| Type-Safe Forms                        | ✅      |

---

## 📁 Backend Module Highlights

- **Book Schema**: title, author, genre, isbn, description, copies, available
- **Borrow Schema**: book reference, quantity, due date
- REST APIs for Book & Borrow operations
- Copy count logic for borrow availability
- Aggregation API for borrow summary
- Pagination support for large datasets

---

## 🛠️ Installation Guide

```bash
# Clone the repo
https://github.com/Jaber-riyan/L2_A4_Client.git

# Install dependencies
npm install

# Run frontend
npm run dev

# Configure backend separately with MongoDB
```


## 📊 Project Status

LibraNova is currently live and fully functional for basic book and borrow management with authentication.

---

## 🌐 Live Demo

**🔗 **[**libra-nova.netlify.app**](https://libra-nova.netlify.app)

---

## 💼 License

MIT — feel free to use this project for learning or enhancement purposes.

---

## 🙏 Feedback & Contribution

Have suggestions or want to contribute? Feel free to fork the repo and raise a PR!

