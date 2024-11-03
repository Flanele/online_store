import React, { useContext, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Spacer,
  Container,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, CART_ROUTE, FAVORITE_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';

const Navbar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement] = useState('left');

  const isMobile = useBreakpointValue({ base: true, md: false });

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
  };

  const navLinks = (
    <>
      <NavLink to={ADMIN_ROUTE} style={{ color: 'white', padding: '8px', textDecoration: 'none' }}>
        Admin panel
      </NavLink>
      <NavLink to={FAVORITE_ROUTE} style={{ color: 'white', padding: '8px', textDecoration: 'none' }}>
        Favorites
      </NavLink>
      <NavLink to={CART_ROUTE} style={{ color: 'white', padding: '8px', textDecoration: 'none' }}>
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
  );

  return (
    <Box bg="black" p={4}>
      <Container maxW="1200px">
        <Flex alignItems="center">
          <Heading color="white" size="lg" p={1}>
            <NavLink to={SHOP_ROUTE} style={{ color: 'white', textDecoration: 'none' }}>
              GlowShop
            </NavLink>
          </Heading>
          <Spacer />
          {isMobile ? (
            <>
              <IconButton
                icon={<HamburgerIcon />}
                variant="outline"
                color="white"
                onClick={onOpen}
                aria-label="Open Menu"
                ml={2}
              />
              <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg="black">
                  <DrawerCloseButton color="white" />
                  <DrawerBody>
                    <Flex direction="column" mt={10} gap={5}>
                      {user.isAuth ? (
                        navLinks
                      ) : (
                        <Button
                          colorScheme="gray"
                          variant="solid"
                          size="sm"
                          width="40%"
                          sx={{ textTransform: 'uppercase' }}
                          onClick={() => {
                            navigate(LOGIN_ROUTE);
                            onClose();
                          }}
                        >
                          Login
                        </Button>
                      )}
                    </Flex>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          ) : (
            <Flex gap={2} alignItems="center">
              {user.isAuth ? (
                navLinks
              ) : (
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
              )}
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
});

export default Navbar;
