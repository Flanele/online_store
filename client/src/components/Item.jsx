import { Box, Image, Text, Flex, Button, Heading } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import star from '../assets/star.svg';
import heart from '../assets/heart.svg'; 
import setHeart from '../assets/purple_heart.svg';
import { fetchBrand } from '../http/brandAPI';
import { ITEM_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { addToCart } from '../http/cartAPI';
import useToastNotification from '../hooks/useToastNotification'; 
import { observer } from 'mobx-react-lite';
import useFavorites from '../hooks/useFavorites';
import { Context } from '../main';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const Item = observer(({ item }) => {
    const {cart} = useContext(Context);
    const [brandName, setBrandName] = useState('');
    const navigate = useNavigate();
    const { showToast } = useToastNotification(); 

    const { like, handleToggleFavorite, isAuth } = useFavorites(item);

    useEffect(() => {
        const getBrand = async () => {
            try {
                const brand = await fetchBrand(item.brandId); 
                setBrandName(brand.name); 
            } catch (error) {
                console.error("Ошибка при получении бренда:", error);
            }
        };

        getBrand();
    }, [item.brandId]);

    const handleAddToCart = useCallback(async (event) => {

        event.stopPropagation(); 

        if (!isAuth) {
            showToast("Please log in");
            return
        }

        try {
            await cart.addItem(item);
            showToast("Thank you!", `${item.name} has been successfully added to the cart.`, "success");
        } catch (error) {
            console.error("Ошибка при добавлении товара в корзину:", error);
        }
    }, [item, showToast]);

    return (
        <Box
            onClick={() => navigate(ITEM_ROUTE + '/' + item.id)}
            width="250px" 
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            cursor="pointer"
            mt={3}
            boxShadow="md"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.02)' }}
            p={4}
        >
            <Box position="relative"> 
                <Image
                    width="100%"
                    height="250px"
                    objectFit="cover"
                    src={`${apiUrl}/${item.img}`} 
                    alt={item.name}
                />
                <Box 
                    position="absolute" 
                    top={2} 
                    right={2} 
                    cursor="pointer" 
                    onClick={handleToggleFavorite}
                >
                    <Image 
                        src={like ? setHeart : heart} 
                        alt="Add to favorites" 
                        width={5} 
                        height={5} 
                    />
                </Box>
            </Box>
            <Box p={2}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading fontSize="28px" fontWeight="semibold">
                        {brandName || 'Loading...'}
                    </Heading>
                    <Flex alignItems="center">
                        <Text fontSize="sm">{item.rating}</Text>
                        <Image ml={1} width={18} height={18} src={star} alt="Star rating" />
                    </Flex>
                </Flex>
                <Text mt={1} noOfLines={1}>{item.name}</Text>
                <Text fontWeight="bold" mt={2}>${item.price.toFixed(2)}</Text>
                <Button
                    mt={2}
                    backgroundColor="black"
                    width="full"
                    textTransform="uppercase"
                    color="white"
                    _hover={{ backgroundColor: "gray.600" }}
                    onClick={handleAddToCart} 
                >
                    ADD TO BAG
                </Button>
            </Box>
        </Box>
    );
});

export default Item;
