import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToastNotification from "../hooks/useToastNotification";
import useFavorites from "../hooks/useFavorites";
import { ITEM_ROUTE } from "../utils/consts";

const apiUrl = import.meta.env.VITE_APP_API_URL;

import bin from '../assets/bin.svg';
import star from '../assets/star.svg';
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { fetchBrand } from "../http/brandAPI";
import { addToCart } from "../http/cartAPI";
import { Context } from "../main";

const FavoriteItem = ({ item }) => {
    const [brandName, setBrandName] = useState('');
    const navigate = useNavigate();
    const { showToast } = useToastNotification(); 
    const {favorite} = useContext(Context);

    const { like, handleToggleFavorite } = useFavorites(item);

    useEffect(() => {
        const getBrand = async () => {
            try {
                const brand = await fetchBrand(item.item.brandId); 
                setBrandName(brand.name); 
            } catch (error) {
                console.error("Ошибка при получении бренда:", error);
            }
        };

        getBrand();
    }, [item.item.brandId]);

    const handleAddToCart = useCallback(async (event) => {
        event.stopPropagation(); 
        try {
            await addToCart(item.item.id);
            showToast("Thank you!", `${item.item.name} has been successfully added to the cart.`, "success");
        } catch (error) {
            console.error("Ошибка при добавлении товара в корзину:", error);
        }
    }, [item.item, showToast]);

    const handleRemove = useCallback((async (event) => {
        event.stopPropagation();

        const foundFavoriteItem = favorite.favorites.find(fav => fav.itemId === item.item.id);

        await favorite.removeItemFromFav(foundFavoriteItem.id); 
        showToast(`${item.item.name} has been successfully removed from the favorites!`);

    }), [item.item, showToast])

    return (
        <Box
            onClick={() => navigate(ITEM_ROUTE + '/' + item.item.id)}
            width="300px" 
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            cursor="pointer"
            boxShadow="md"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.02)' }}
            p={4}
        >
            <Box position="relative"> 
                <Image
                    width="100%"
                    height="270px"
                    objectFit="cover"
                    src={`${apiUrl}/${item.item.img}`} 
                    alt={item.item.name}
                />
                <Box 
                    position="absolute" 
                    top={2} 
                    right={2} 
                    cursor="pointer" 
                >
                    <Image 
                        src={bin} 
                        alt="Add to favorites" 
                        width={5} 
                        height={5} 
                        onClick={handleRemove}
                    />
                </Box>
            </Box>
            <Box p={2}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading fontSize="28px" fontWeight="semibold">
                        {brandName || 'Loading...'}
                    </Heading>
                    <Flex alignItems="center">
                        <Text fontSize="sm">{item.item.rating}</Text>
                        <Image ml={1} width={18} height={18} src={star} alt="Star rating" />
                    </Flex>
                </Flex>
                <Text mt={1} noOfLines={1}>{item.item.name}</Text>
                <Text fontWeight="bold" mt={2}>${item.item.price.toFixed(2)}</Text>
                <Button
                    mt={2}
                    variant="outline"
                    width="full"
                    textTransform="uppercase"
                    color="black"
                    onClick={handleAddToCart} 
                >
                    ADD TO BAG
                </Button>
            </Box>
        </Box>
    );
};


export default FavoriteItem;