import { NavLink } from 'react-router-dom';
import bag from '../assets/bag.svg';
import heart from '../assets/heart.svg';
import './styles/UserOptions.css';
import { CART_ROUTE, FAVORITE_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Flex } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';
import { fetchCart } from '../http/cartAPI';

const UserOptions = observer(() => {
    const { user, cart, favorite } = useContext(Context);
    const isAuth = user.isAuth;

    useEffect(() => {
        if (isAuth) {
            const getCart = async () => {
                try {
                    const cartItems = await fetchCart();
                    cart.setItems(cartItems);
                } catch (error) {
                    console.log("Ошибка при получении корзины:", error);
                }
            }

            getCart()
        };
    }, [cart, isAuth]);

    const cartCount = cart.items.length;
    const favoriteCount = favorite.favorites.length;

    return (
        <Flex justifyContent="end" position="relative">
            <NavLink to={isAuth ? CART_ROUTE : LOGIN_ROUTE} className="options__link">
                <img className="options__link-bag" src={bag} alt="bag icon" />
                {cartCount > 0 && (
                    <span className="options__cart-count">{cartCount}</span>
                )}
            </NavLink>
            <NavLink to={isAuth ? FAVORITE_ROUTE : LOGIN_ROUTE} className="options__link">
                <img className="options__link-heart" src={heart} alt="heart icon" />
                {favoriteCount > 0 && (
                    <span className="options__favorite-count">{favoriteCount}</span>
                )}
            </NavLink>   
        </Flex>
    )
});

export default UserOptions;