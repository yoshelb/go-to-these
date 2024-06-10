import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import HomePage from "../components/HomePage/index.js";
import CreateAReviewPage from "../components/CreateAReviewPage";
import SingleReviewPage from "../components/SingleReviewPage";
import ListDetailPage from "../components/ListDetailPage/ListDetailPage.jsx";
import NewListForm from "../components/NewListForm/NewListForm.jsx";
import DeleteListPage from "../components/DeleteListPage/DeleteListPage.jsx";
import DeleteReviewPage from "../components/SingleReviewPage/DeleteReviewPage.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/reviews/new",
        element: <CreateAReviewPage />,
      },
      {
        path: "/reviews/:reviewId",
        element: <SingleReviewPage />,
      },
      {
        path: "/lists/:listId",
        element: <ListDetailPage />,
      },
      {
        path: "/lists/new",
        element: <NewListForm />,
      },
      {
        path: "/lists/:listId/delete",
        element: <DeleteListPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/reviews/:reviewId/delete",
        element: <DeleteReviewPage />,
      },
    ],
  },
]);
