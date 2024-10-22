import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Spacer,
  Container,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, CART_ROUTE, FAVORITE_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';

const Navbar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
  };

  return (
    <Box bg="black" p={4}>
      <Container maxW="1200px">
        <Flex gap='2' alignItems="center">
          <Heading color="white" size="lg" p={1}>
            <NavLink to={SHOP_ROUTE} style={{ color: 'white', textDecoration: 'none' }}>OnlineStore</NavLink>
          </Heading>
          <Spacer />
          {user.isAuth ? (
            <>
              <NavLink 
                to={ADMIN_ROUTE} 
                style={{ color: 'white', padding: '8px', textDecoration: 'none' }} 
              >
                Admin panel
              </NavLink>
              <NavLink 
                to={FAVORITE_ROUTE} 
                style={{ color: 'white', padding: '8px', textDecoration: 'none' }} 
              >
                Favorites
              </NavLink>
              <NavLink 
                to={CART_ROUTE} 
                style={{ color: 'white', padding: '8px', textDecoration: 'none' }} 
              >
                Cart
              </NavLink>
              <Button 
                colorScheme="gray" 
                variant="solid" 
                size="sm" 
                ml={4}
                sx={{ textTransform: 'uppercase' }}
                onClick={logOut}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                colorScheme="gray" 
                variant="solid" 
                size="sm" 
                ml={4}
                sx={{ textTransform: 'uppercase' }}
                onClick={() => navigate(LOGIN_ROUTE)} 
              >
                Login
              </Button>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  );
});

export default Navbar;
