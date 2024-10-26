import React, { useCallback, useState } from 'react';
import SwiperBanner from '../components/SwiperBanner';
import { Box, Container, Flex } from '@chakra-ui/react';
import TypeBar from '../components/TypeBar';
import { observer } from 'mobx-react-lite';
import BrandBar from '../components/BrandBar';
import ItemsList from '../components/ItemsList';
import Pagination from '../components/Pagination';
import useShopData from '../hooks/useShopData';
import SearchSection from '../components/SearchSection';
import useFilteredItems from '../hooks/useFilteredItems'; 

const Shop = observer(() => {
    const { item } = useShopData();
    const [searchTerm, setSearchTerm] = useState(''); 

    const filteredItems = useFilteredItems(item.items, searchTerm);

    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
    }, []);

    return (
        <>
            <Container maxW="1800px">
                <SwiperBanner />
                <SearchSection onSearch={handleSearch} /> 
                <Flex>
                    <Box width="450px" p={4} mr={10}>
                        <TypeBar />
                    </Box>
                    <Box flex="1" p={4}>
                        <Flex direction="column" align="flex-start">
                            <BrandBar />
                            <Box mt={4} width="100%">
                                <ItemsList items={filteredItems} /> 
                            </Box>
                            <Box mt={7}>
                                <Pagination />
                            </Box>                          
                        </Flex>
                    </Box>
                </Flex>
            </Container>
        </>
    );
});

export default Shop;
