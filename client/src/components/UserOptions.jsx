import { NavLink } from 'react-router-dom';
import bag from '../assets/bag.svg';
import heart from '../assets/heart.svg';
import './styles/UserOptions.css';
import { CART_ROUTE, FAVORITE_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { Context } from '../main';

const UserOptions = () => {
    const {user} = useContext(Context);
    const isAuth = user.isAuth;

    return (
        <Flex justifyContent="end">
            <NavLink to={isAuth ? CART_ROUTE : LOGIN_ROUTE} className="options__link">
                <img className="options__link-bag" src={bag} alt="bag icon" />
            </NavLink>
            <NavLink to={isAuth ? FAVORITE_ROUTE : LOGIN_ROUTE} className="options__link">
                <img className="options__link-heart" src={heart} alt="heart icon" />
            </NavLink>   
        </Flex>
    )
};

export default UserOptions;