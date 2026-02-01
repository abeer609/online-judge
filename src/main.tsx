import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProblemList from "./Problems.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProblemPage from "./ProblemPage.tsx";
import "./index.css";
import RootLayout from "./RootLayout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "",
                index: true,
                element: <ProblemList />,
            },
            {
                path: "/problems/:id",
                element: <ProblemPage />,
            },
        ],
    },
]);
export const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={client}>
            <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
    </StrictMode>,
);
