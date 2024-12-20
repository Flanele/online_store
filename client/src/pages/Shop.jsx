import React, { useState } from 'react';
import SwiperBanner from '../components/SwiperBanner';
import { Box, Container, Flex } from '@chakra-ui/react';
import TypeBar from '../components/TypeBar';
import { observer } from 'mobx-react-lite';
import BrandBar from '../components/BrandBar';
import ItemsList from '../components/ItemsList';
import Pagination from '../components/Pagination';
import useShopData from '../hooks/useShopData';
import SearchSection from '../components/SearchSection';

const Shop = observer(() => {
    const [searchTerm, setSearchTerm] = useState('');
    const { item } = useShopData(searchTerm); 

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const totalPages = Math.ceil(item.totalCount / item.limit);

    return (
        <>
            <Container maxW="1800px">
                <SwiperBanner />
                <SearchSection onSearch={handleSearch} /> 
                <Flex direction={{ base: "column", md: "row" }} mt={4}>
                    <Box width={{ base: "100%", md: "300px", lg: "450px" }} p={4} mr={{ lg: 10, md: 2 }}>
                        <TypeBar />
                    </Box>
                    <Box flex="1" p={4}>
                        <Flex direction="column" align="flex-start">
                            <BrandBar />
                            <Box mt={4} width="100%">
                                <ItemsList items={item.items}  /> 
                            </Box>
                            <Box mt={7}>
                                <Pagination
                                    currentPage={item.page}
                                    pageCount={totalPages}
                                    onPageChange={(page) => item.setPage(page)}
                                />
                            </Box>                          
                        </Flex>
                    </Box>
                </Flex>
            </Container>
        </>
    );
});

export default Shop;
