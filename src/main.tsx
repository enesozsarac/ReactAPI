import React from "react";
import "./main.css";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./roots/Root";
import { AlbumPage, FavoritesDetail, HomePage, PostPage, UserDetail, UsersPage } from "./roots";
import { usersLoader } from "./roots/UsersPage";
import { userLoader } from "./roots/UserDetail";
import { postLoader } from "./roots/PostPage";
import { albumLoader } from "./roots/AlbumPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "users",
        element: <UsersPage />,
        loader: usersLoader,
      },
      {
        path: "users/:userId",
        children: [
          {
            index: true,
            element: <UserDetail />,
            loader: userLoader,
          },
        ],
      },
      {
        path: "users/:userId/posts/:postId",
        children: [
          {
            index: true,
            element: <PostPage />,
            loader: postLoader,
          },
        ],
      },
      {
        path: "users/:userId/albums/:albumId",
        children: [
          {
            index: true,
            element: <AlbumPage />,
            loader: albumLoader,
          },
        ],
      },
      {
        path: "favorites",
        element: <FavoritesDetail/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
