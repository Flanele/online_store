import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import SwiperProducts from '../components/SwiperProducts';
import FavoriteItem from '../components/FavoriteItem';
import { toJS } from "mobx";
import { fetchFavorites } from '../http/favoriteAPI';

const Favorites = observer(() => {
    const {favorite} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const data = await fetchFavorites();
                favorite.setFavorites(data);
            } catch (error) {
                console.error("Ошибка при загрузке избранных:", error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [favorite]);

    const favoriteItems = favorite.favorites || []; 
    const isFavsEmpty = favoriteItems.length === 0;

        return (
            <Container maxW="1200px">
                {loading ? (
                    <Text mt={10} textAlign="center" fontSize="24px">Your wishlist is loading...</Text>
                ) : (
                    isFavsEmpty ? 
                        <Box mt={20}>
                            <Text textAlign="center" fontSize="24px" mb="100px">Your wishlist is empty...</Text>
                            <SwiperProducts />
                        </Box>
                    :
                    <Box mt={20}>
                    <Text textAlign="center" fontSize="28px" mb="70px">Your wishlist ♥</Text>
                    <Flex gap="40px" flexWrap="wrap" justifyContent="center">
                        {favoriteItems.map((item) => ( 
                            <FavoriteItem key={item.id} item={item} />
                        ))}
                    </Flex>                   
                    </Box>   
                )}
            </Container>
        );
});

export default Favorites;