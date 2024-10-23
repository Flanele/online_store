import React, { useContext, useEffect } from 'react';
import SwiperBanner from '../components/SwiperBanner';
import { Box, Container, Flex } from '@chakra-ui/react';
import TypeBar from '../components/TypeBar';
import { Context } from '../main';
import { fetchBrands, fetchItems, fetchTypes } from '../http/itemAPI';
import { observer } from 'mobx-react-lite';
import BrandBar from '../components/BrandBar';
import ItemsList from '../components/ItemsList';

const Shop = observer(() => {
    const {item} = useContext(Context);

    useEffect (() => {
        fetchTypes().then(data => item.setTypes(data));
        fetchBrands().then(data => item.setBrands(data));
        fetchItems(null, null, 1, 12).then(data => {
            item.setItems(data.rows);
            item.setTotalCount(data.count);
        });
    }, []);

    useEffect(() => {
        const typeId = item.selectedType && item.selectedType.id ? item.selectedType.id : null;
        const brandId = item.selectedBrand && item.selectedBrand.id ? item.selectedBrand.id : null;
    
        fetchItems(typeId, brandId, item.page, item.limit).then(data => {
            item.setItems(data.rows);
            item.setTotalCount(data.count);
        });
    }, [item.page, item.selectedType, item.selectedBrand]);

    return (
        <>
           <Container maxW="1800px">
                <SwiperBanner />

                <Flex>
                    <Box width="450px" p={4}>
                        <TypeBar />
                    </Box>

                    <Box flex="1" p={4}>
                        <Flex direction="column" align="flex-start">
                            <BrandBar />
                            <Box mt={4} width="100%">
                                <ItemsList />
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
            </Container>
            
        </>
    )
});

export default Shop;