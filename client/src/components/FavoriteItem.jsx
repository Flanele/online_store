import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import useFavoriteItem from "../hooks/useFavoriteItem";
import bin from '../assets/bin.svg';
import star from '../assets/star.svg';

const FavoriteItem = ({ item }) => {
    const {
        brandName,
        handleAddToCart,
        handleRemove,
        goToItemPage,
        like,
        handleToggleFavorite,
    } = useFavoriteItem(item);

    return (
        <Box
            onClick={goToItemPage}
            width="300px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            cursor="pointer"
            boxShadow="md"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.02)' }}
            p={4}
        >
            <Box position="relative"> 
                <Image
                    width="100%"
                    height="270px"
                    objectFit="cover"
                    src={`${apiUrl}/${item.item.img}`} 
                    alt={item.item.name}
                />
                <Box 
                    position="absolute" 
                    top={2} 
                    right={2} 
                    cursor="pointer" 
                >
                    <Image 
                        src={bin} 
                        alt="Remove from favorites" 
                        width={5} 
                        height={5} 
                        onClick={handleRemove}
                    />
                </Box>
            </Box>
            <Box p={2}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading fontSize={{ base: "20px", md: "28px" }} fontWeight="semibold">
                        {brandName || 'Loading...'}
                    </Heading>
                    <Flex alignItems="center">
                        <Text fontSize="sm">{item.item.rating}</Text>
                        <Image ml={1} width={18} height={18} src={star} alt="Star rating" />
                    </Flex>
                </Flex>
                <Text mt={1} noOfLines={1} fontSize={{ base: "sm", md: "md" }}>{item.item.name}</Text>
                <Text fontWeight="bold" mt={2} fontSize={{ base: "sm", md: "md" }}>${item.item.price.toFixed(2)}</Text>
                <Button
                    mt={2}
                    variant="outline"
                    width="full"
                    textTransform="uppercase"
                    color="black"
                    onClick={handleAddToCart} 
                    fontSize={{ base: "sm", md: "md" }} 
                >
                    ADD TO BAG
                </Button>
            </Box>
        </Box>
    );
};

export default FavoriteItem;
