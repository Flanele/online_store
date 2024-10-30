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
        <Container maxW="1200px">
            <Box mt={10}>
                 <UserOptions />
            </Box>          
            <Flex mt={20} gap="160px" alignItems="flex-start">
                <Image 
                    w="500px" 
                    h="500px" 
                    src={imageSrc} 
                    objectFit="cover" 
                />
                <Box mt={10} maxW="500px" minW="500px"> 
                    <ItemDetails 
                        id={item.id}
                        name={item.name} 
                        brandName={brandName} 
                        price={item.price} 
                        rating={item.rating} 
                    />

                    <Box>
                        <ItemAccordion info={item.info} />
                        <Button mt={7} ml="auto" display="block" size="xs" variant="outline" onClick={handleEditClick} >Edit description</Button>
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

        <Container maxW="1400px">
            <Box mt="110px">
                <SwiperProducts />
            </Box>
        </Container>
        </>
    );
});


export default ItemPage;