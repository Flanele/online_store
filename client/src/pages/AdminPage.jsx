import { Button, Container, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import AddNewType from '../components/modals/AddNewType';
import AddNewBrand from '../components/modals/AddNewBrand';

const AdminPage = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [itemVisible, setItemVisible] = useState(false);

    return (
        <Container maxW="1200px">
            <Flex mt={10} flexDirection="column" gap={5}>
                <Button 
                    size="lg" 
                    color="white" 
                    bg="black" 
                    _hover={{ bg: "gray.700" }}
                    onClick={() => setTypeVisible(true)} 
                >
                    Add new type
                </Button>
                <Button 
                    size="lg" 
                    color="white" 
                    bg="black" 
                    _hover={{ bg: "gray.700" }} 
                    onClick={() => setBrandVisible(true)}
                >
                    Add new brand
                </Button>
                <Button 
                    size="lg" 
                    color="white" 
                    bg="black" 
                    _hover={{ bg: "gray.700" }} 
                >
                    Add new product
                </Button>
            </Flex>

            <AddNewType show={typeVisible} onClose={() => setTypeVisible(false)} />
            <AddNewBrand show={brandVisible} onClose={() => setBrandVisible(false)} />
        </Container>
    )
};

export default AdminPage;