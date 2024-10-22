import { Button, Card, CardBody, FormControl, FormLabel, Input, FormHelperText, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';  
import { observer } from 'mobx-react-lite';
import { login, registration } from '../http/userAPI';

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(''); 

    const handleAuthAction = async () => {
        setError('');

        if (!email || !password || (isLogin ? false : !username)) {
            setError('Please fill in all required fields.');
            return; 
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return; 
        }

        try {
            let data;

            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password, username);
            }

            user.setUser(data);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            if (e && e.response) {
                setError(e.response.data.message); 
            } else {
                setError('An unexpected error occurred. Please try again.'); 
            }
        }
    };

    return (
        <Card width="400px" p={5} mx="auto" mt={10} boxShadow="lg" borderRadius="md">
            <CardBody>
                <FormControl isRequired>
                    {!isLogin && (
                        <>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" onChange={e => setUsername(e.target.value)} placeholder='Your username' />
                        </>
                    )}

                    <FormLabel mt={4}>Email address</FormLabel>
                    <Input onChange={e => setEmail(e.target.value)} type='email' />

                    <FormLabel mt={4}>Password</FormLabel>
                    <Input onChange={e => setPassword(e.target.value)} type='password' />
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
                    mt={6}
                    width="full"
                    sx={{ textTransform: 'uppercase' }}
                    onClick={handleAuthAction}
                >
                    {isLogin ? 'Login' : 'Registration'}
                </Button>

                <Text mt={4} fontSize={'14px'} style={{ textAlign: 'center' }}>
                    {isLogin ? (
                        <>
                            Don't have an account?{' '}
                            <NavLink style={{textDecoration: 'underline'}} to={REGISTRATION_ROUTE}>Register here.</NavLink>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <NavLink style={{textDecoration: 'underline'}} to={LOGIN_ROUTE}>Log in here.</NavLink>
                        </>
                    )}
                </Text>
            </CardBody>
        </Card>
    );
});

export default Auth;
