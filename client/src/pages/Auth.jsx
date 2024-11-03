import { Button, Card, CardBody, FormControl, FormLabel, Input, FormHelperText, Text, Flex, Image, Container } from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import useAuth from '../hooks/useAuth';
import img from '../assets/auth_banner.jpg';

const Auth = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const {
        email,
        password,
        username,
        error,
        setEmail,
        setPassword,
        setUsername,
        handleAuthAction,
    } = useAuth(isLogin);

    const handleSubmit = async () => {
        const success = await handleAuthAction();
        if (success) {
            navigate(SHOP_ROUTE); 
        }
    };

    return (
        <Container maxW={{ base: "97%", md: "768px", lg: "1200px" }} p={{ base: 4, md: 6 }}>
            <Flex 
                mt={{ base: 10, md: 20 }} 
                direction={{ base: "column", md: "row" }} 
                alignItems="center" 
                justifyContent="center"
            >
                <Image 
                    src={img} 
                    display={{ base: "none", md: "block" }} 
                    width={{ base: "100%", md: "45%", lg: "500px" }} 
                    height={{ base: "auto" }}
                    objectFit="cover"
                    mr={{ md: 8 }}
                />
                <Card 
                    width={{ base: "100%", sm: "90%", md: "50%", lg: "400px" }} 
                    p={5} 
                    mx="auto" 
                    mt={{ base: 5, md: 0 }} 
                    boxShadow="lg" 
                    borderRadius="md"
                >
                    <CardBody>
                        <FormControl isRequired>
                            {!isLogin && (
                                <>
                                    <FormLabel>Username</FormLabel>
                                    <Input 
                                        type="text" 
                                        onChange={e => setUsername(e.target.value)} 
                                        placeholder="Your username" 
                                    />
                                </>
                            )}

                            <FormLabel mt={4}>Email address</FormLabel>
                            <Input onChange={e => setEmail(e.target.value)} type="email" />

                            <FormLabel mt={4}>Password</FormLabel>
                            <Input onChange={e => setPassword(e.target.value)} type="password" />
                            {!isLogin && (
                                <FormHelperText>The password must contain at least 6 characters.</FormHelperText>
                            )}
                                
                            {error && <Text color="red.500" mt={2}>{error}</Text>}
                        </FormControl>

                        <Button
                            bg="black" 
                            color="white" 
                            _hover={{ bg: "gray.800" }}  
                            variant="solid" 
                            mt={10}
                            width="full"
                            sx={{ textTransform: "uppercase" }}
                            onClick={handleSubmit} 
                        >
                            {isLogin ? "Login" : "Registration"}
                        </Button>

                        <Text mt={4} fontSize="14px" textAlign="center">
                            {isLogin ? (
                                <>
                                    Don't have an account?{" "}
                                    <NavLink style={{ textDecoration: "underline" }} to={REGISTRATION_ROUTE}>Register here.</NavLink>
                                </>
                            ) : (
                                <>
                                    Already have an account?{" "}
                                    <NavLink style={{ textDecoration: "underline" }} to={LOGIN_ROUTE}>Log in here.</NavLink>
                                </>
                            )}
                        </Text>
                    </CardBody>
                </Card>
            </Flex>
        </Container>
    );
});

export default Auth;
