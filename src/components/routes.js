import Login from "./Login/Login";
import Main from "./Main/Main";
import Profile from "./Profile/Profile";
import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login,
    }
]

export const profileRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: Profile,
    }
]

export const privateRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main,
    }
]