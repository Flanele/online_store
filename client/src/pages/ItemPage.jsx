import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneItem, updateItem } from '../http/itemAPI';
import { Box, Button, Container, Flex, Image, Spinner } from '@chakra-ui/react';
import { fetchBrand } from '../http/brandAPI';

const apiUrl = import.meta.env.VITE_APP_API_URL;
import ItemAccordion from '../components/ItemAccordion';
import ItemDetails from '../components/ItemDetails';
import EditItem from '../components/modals/EditItem';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';
import { LOGIN_ROUTE } from '../utils/consts';
import SwiperProducts from '../components/SwiperProducts';
import UserOptions from '../components/UserOptions';

const ItemPage = observer(() => {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState({ info: [] });
    const [brandName, setBrandName] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const { id } = useParams();

    const {user} = useContext(Context);
    const navigate = useNavigate();
    const isAuth = user.isAuth;

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleEditClick = () => {
        if (!isAuth) {
            navigate(LOGIN_ROUTE);
        } else {
            openModal();
        }
    };

    useEffect(() => {
        const getItem = async () => {
            try {
                const data = await fetchOneItem(id);
                setItem(data);
                setImageSrc(`${apiUrl}/${data.img}`);
                const brand = await fetchBrand(data.brandId);
                setBrandName(brand.name);
            } catch (error) {
                console.error("Error fetching item or brand:", error);
            } finally {
                setLoading(false); 
            }
        };

        getItem();
    }, [id]);

    if (loading) {
        return (
            <Container mt={20}>
                <Spinner size='lg' />
            </Container>
        );
    }

    const handleSave = async (updatedItem) => {
        const formData = new FormData();
        Object.entries(updatedItem).forEach(([key, value]) => {
            if (key === 'img' && value) {
                formData.append('img', value);
            } else {
                formData.append(key, key === 'info' ? JSON.stringify(value) : value);
            }
        });

        try {
            await updateItem(item.id, formData);
            if (updatedItem.img) {
                setImageSrc(`${apiUrl}/${updatedItem.img}`); 
            }
            setItem(prev => ({ ...prev, ...updatedItem })); 
            closeModal();
        } catch (error) {
            console.error("Error updating item:", error);
        }
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
                <Box mt={15} maxW="500px" minW="500px"> 
                    <ItemDetails 
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