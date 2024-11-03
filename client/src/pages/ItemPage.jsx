import React from 'react';
import { Box, Button, Container, Flex, Image, Spinner } from '@chakra-ui/react';

import ItemAccordion from '../components/ItemAccordion';
import ItemDetails from '../components/ItemDetails';
import EditItem from '../components/modals/EditItem';
import { observer } from 'mobx-react-lite';
import SwiperProducts from '../components/SwiperProducts';
import UserOptions from '../components/UserOptions';
import useItemData from '../hooks/useItemData';
import useEditModal from '../hooks/useEditModal';
import CommentsSection from '../components/CommentsSection';

const ItemPage = observer(() => {
    const {
        loading,
        item,
        brandName,
        imageSrc,
        setItem,
        setImageSrc,
    } = useItemData();

    const {
        isModalOpen,
        openModal,
        closeModal,
        handleEditClick,
        handleSave,
    } = useEditModal(item, setItem, setImageSrc);

    if (loading) {
        return (
            <Container mt={20}>
                <Spinner size='lg' />
            </Container>
        );
    };

    return (
        <>
        <Container maxW={{ base: "95%", md: "1200px" }} mx="auto">
            <Box mt={10}>
                 <UserOptions />
            </Box>          
            <Flex 
                mt={10} 
                gap={{ base: "20px", md: "40px", lg: "160px" }} 
                direction={{ base: "column", md: "row" }} 
                alignItems="flex-start"
            >
                <Image 
                    w={{ base: "90%", md: "400px", lg: "500px" }} 
                    h={{ base: "auto", md: "400px", lg: "500px" }} 
                    src={imageSrc} 
                    objectFit="cover" 
                />
                <Box mt={10} w="100%">
                    <ItemDetails 
                        id={item.id}
                        name={item.name} 
                        brandName={brandName} 
                        price={item.price} 
                        rating={item.rating} 
                    />

                    <Box>
                        <ItemAccordion info={item.info} />
                        <Button 
                            mt={7} 
                            ml="auto" 
                            display="block" 
                            size="xs" 
                            variant="outline" 
                            onClick={handleEditClick} 
                        >
                            Edit description
                        </Button>
                    </Box>
                </Box>
            </Flex>
            <EditItem
                isOpen={isModalOpen}
                onClose={closeModal}
                itemData={item}
                onSave={handleSave}
            />
        </Container>

        <Container maxW={{ base: "95%", md: "1400px" }} mx="auto">
            <Box mt="110px">
                <SwiperProducts />
            </Box>
        </Container>

        <Container maxW={{ base: "95%", md: "1200px" }} mx="auto">
            <Box mt="110px">
                <CommentsSection />
            </Box>
        </Container>
        </>
    );
});

export default ItemPage;
