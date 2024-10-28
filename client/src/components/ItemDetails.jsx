import { Box, Text, Heading, Flex, Button, Image } from "@chakra-ui/react";
import star from '../assets/star.svg';
import heart from '../assets/heart.svg';
import { addToCart } from "../http/cartAPI";
import useToastNotification from "../hooks/useToastNotification";
import { useCallback } from "react";

const ItemDetails = ({ name, brandName, price, rating, img }) => {
    const { showToast } = useToastNotification();

    const handleAddToCart = useCallback(() => {
        addToCart(); 
        showToast("Success!", `${name} has been added to your cart.`, "success"); 
    });

    return (
        <>
            <Text mb={2} fontSize="20px">{brandName}</Text> 
            <Heading fontSize="28px">{name}</Heading> 
            
            <Flex mt={4} justifyContent="center" alignItems="center">
                <Text fontSize="sm">{rating}</Text>
                <Image ml={1} width="18px" height="18px" src={star} alt="Star rating" />
            </Flex>
            
            <Heading mt={4} fontSize="28px" textAlign="center">${price.toFixed(2)}</Heading>
            
            <Flex 
                mt={14} 
                gap="40px"
                w="390px"    
                justifyContent="space-between" 
                alignItems="center"
            >
                <Button 
                    p={6}
                    flex="1"             
                    maxW="300px"   
                    backgroundColor="green.400" 
                    color="white"            
                    _hover={{ backgroundColor: "green.500" }} 
                    onClick={handleAddToCart}
                >
                    ADD TO CART
                </Button>
                <Box ml={4}> 
                    <button>
                        <img src={heart} alt="Add to Favorites" style={{ width: "25px", height: "25px"}} />
                    </button>                                    
                </Box>
            </Flex>
       </>
    );
};

export default ItemDetails;
