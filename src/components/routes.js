import Login from "./Login/Login";
import Main from "./Main/Main";
import { LOGIN_ROUTE, MAIN_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login,
    }
]

export const privateRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main,
    }
]