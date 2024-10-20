import AdminPage from "./pages/AdminPage";
import Auth from "./pages/Auth";
import ItemPage from "./pages/ItemPage";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import { ADMIN_ROUTE, CART_ROUTE, ITEM_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, FAVORITE_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: FAVORITE_ROUTE,
        Component: Favorites
    }

];

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },

    {
        path: LOGIN_ROUTE,
        Component: Auth
    },

    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },

    {
        path: ITEM_ROUTE + '/:id',
        Component: ItemPage
    }

];