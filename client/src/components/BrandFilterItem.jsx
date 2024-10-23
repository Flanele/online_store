import React from 'react';
import { Box } from '@chakra-ui/react';

const BrandFilterItem = ({ brand, isSelected, onClick }) => {
    return (
        <Box
            p={4}
            m={2}
            borderWidth="1px"
            borderRadius="md"
            cursor="pointer"
            onClick={onClick}
            borderColor={isSelected ? 'black' : 'gray.200'}
            _hover={{ borderColor: 'black', boxShadow: 'md' }}
        >
            {brand.name || "View all"}
        </Box>
    );
};

export default BrandFilterItem;
