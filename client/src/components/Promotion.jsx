import { Box, Container, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';

const Promotion = () => {
    const fontSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
    const padding = useBreakpointValue({ base: 2, md: 3, lg: 4 });

    return (
        <Box bg="gray.200" p={padding}>
            <Container maxW="1200px">
                <Text fontSize={fontSize} color="black" textAlign="center">
                    Save 15% on selected items when you spend $70 with code: CODE
                </Text>
            </Container>
        </Box>
    );
}

export default Promotion;
