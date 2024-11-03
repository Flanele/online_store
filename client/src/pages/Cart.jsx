import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import SwiperProducts from '../components/SwiperProducts';
import { observer } from 'mobx-react-lite';
import CartItem from '../components/CartItem';

const Cart = observer(() => {
    const { cart } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCartItems = async () => {
            await cart.loadCartItems(); 
            setLoading(false);  
        };

        loadCartItems();
    }, [cart]);

    const removeFromCart = async (cartItemId) => {
        await cart.removeItem(cartItemId); 
    };

    const cartItems = cart.items || []; 
    const isCartEmpty = cartItems.length === 0;

    return (
        <Container maxW={{ base: "100%", md: "90%", lg: "1200px" }} p={{ base: 4, md: 6, lg: 8 }}>
            {loading ? (
                <Text mt={10} textAlign="center" fontSize={{ base: "20px", md: "24px" }}>Cart is loading...</Text>
            ) : (
                isCartEmpty ? (
                    <Box mt={{ base: 10, md: 20 }}>
                        <Text textAlign="center" fontSize={{ base: "20px", md: "24px" }} mb={{ base: "50px", md: "100px" }}>
                            Your cart is empty...
                        </Text>
                        <SwiperProducts />
                    </Box>
                ) : (
                    <Flex 
                        mt={10} 
                        gap={5} 
                        alignItems="center" 
                        flexDirection="column"
                        px={{ base: 2, md: 5 }}
                    >
                        {cartItems.map((item) => ( 
                            <CartItem key={item.id} item={item} onClick={removeFromCart} />
                        ))}
                        <Box 
                            w={{ base: "100%", md: "80%" }} 
                            p={4} 
                            mt={4} 
                            borderWidth="1px" 
                            borderRadius="lg" 
                            textAlign="right"
                        >
                            <Text textAlign="center" fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                                Total Price: ${cart.total.toFixed(2)}
                            </Text>
                        </Box>
                    </Flex>
                )
            )}
        </Container>
    );
});

export default Cart;
