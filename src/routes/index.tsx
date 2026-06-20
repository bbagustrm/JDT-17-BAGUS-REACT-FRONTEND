import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { HomePage } from "@/pages/HomePage";
import {CVPage} from "@/pages/CVPage.tsx";
import {MoviesPage} from "@/pages/MoviesPage.tsx";
import {TodosPage} from "@/pages/TodosPage.tsx";

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <HomePage />,
    },
    {
        path: ROUTES.CV,
        element: <CVPage />,
    },
    {
        path: ROUTES.MOVIES,
        element: <MoviesPage />,
    },
    {
        path: ROUTES.TODOS,
        element: <TodosPage />,
    },
]);