import {createBrowserRouter} from "react-router-dom";
import {ROUTES} from "@/constants/routes";
import {HomePage} from "@/pages/HomePage";
import {CVPage} from "@/pages/CVPage.tsx";
import {MoviesPage} from "@/pages/MoviesPage.tsx";
import TodosPage from "@/pages/TodosPage.tsx";
import CreateTodoPage from "@/pages/CreateTodoPage.tsx";
import {MovieDetailPage} from "@/pages/MovieDetailPage.tsx";
import {LoginPage} from "@/pages/LoginPage.tsx";
import {ProtectedRoute} from "@/components/ProtectedRoute.tsx";

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <HomePage/>,
    },
    {
        path: ROUTES.LOGIN,
        element: <LoginPage/>},
    {
        path: ROUTES.CV,
        element: <ProtectedRoute><CVPage /></ProtectedRoute>,
    },
    {
        path: ROUTES.MOVIES,
        element: <ProtectedRoute><MoviesPage /></ProtectedRoute>,
    },
    {
        path: ROUTES.MOVIES_DETAIL,
        element: <ProtectedRoute><MovieDetailPage /></ProtectedRoute>,
    },
    {
        path: ROUTES.TODOS,
        element: <ProtectedRoute><TodosPage /></ProtectedRoute>,
    },
    {
        path: ROUTES.TODOS_CREATE,
        element: <ProtectedRoute><CreateTodoPage /></ProtectedRoute>,
    },
]);