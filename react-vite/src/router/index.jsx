import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import HomePage from "../components/HomePage/index.js";
import CreateAReviewPage from "../components/CreateAReviewPage";
import SingleReviewPage from "../components/SingleReviewPage";

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
        path: "/reviews/create",
        element: <CreateAReviewPage />,
      },
      {
        path: "/reviews/:reviewId",
        element: <SingleReviewPage />,
      },
    ],
  },
]);
