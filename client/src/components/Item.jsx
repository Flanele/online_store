import { Box, Image, Text, Flex, Button, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import star from '../assets/star.svg';
import heart from '../assets/heart.svg'; 
import { fetchBrand } from '../http/brandAPI';
import { ITEM_ROUTE } from '../utils/consts';
const apiUrl = import.meta.env.VITE_APP_API_URL;

const Item = ({ item }) => {
    const [brandName, setBrandName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getBrand = async () => {
            try {
                const brand = await fetchBrand(item.brandId); 
                setBrandName(brand.name); 
            } catch (error) {
                console.error("Error fetching brand:", error);
            }
        };

        getBrand();
    }, [item.brandId]);

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
                >
                    <Image 
                        src={heart} 
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
                >
                    ADD TO BAG
                </Button>
            </Box>
        </Box>
    );
}

export default Item;

