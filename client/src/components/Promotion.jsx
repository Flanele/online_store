import { Box, Container, Text } from '@chakra-ui/react';
import React from 'react';

const Promotion = () => {
    return (
        <Box bg="gray.200" p={3}>
            <Container maxW="1200px">
                <Text fontSize="16px" color="black" style={{textAlign: 'center'}}>Save 15% on selected items when you spend 70$ with code: CODE</Text>
            </Container>
        </Box>
    )
}

export default Promotion;