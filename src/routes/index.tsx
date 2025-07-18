import { createBrowserRouter } from "react-router";
import App from "../App";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/register";
import HomePage from "@/components/home";
import PrivateRoutes from "./privateRoutes/PrivateRoutes";
import BooksPage from "@/pages/booksPage";
import CreateBookForm from "@/pages/addBookPage";
import ErrorForRoot from "@/error/errorForRoot";
import BorrowSummaryPage from "@/pages/borrowSummary";
import BookDetailsPage from "@/pages/bookDetails";
import EditBook from "@/pages/editBook";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorForRoot />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/signup",
        Component: SignupPage,
      },
      {
        path: "/books",
        element: (
          <PrivateRoutes>
            <BooksPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/books/:id",
        element: (
          <PrivateRoutes>
            <BookDetailsPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/edit-book/:id",
        element: (
          <PrivateRoutes>
            <EditBook />
          </PrivateRoutes>
        ),
      },
      {
        path: "/create-book",
        element: (
          <PrivateRoutes>
            <CreateBookForm />
          </PrivateRoutes>
        ),
      },
      {
        path: "/borrow-summary",
        element: (
          <PrivateRoutes>
            <BorrowSummaryPage />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
