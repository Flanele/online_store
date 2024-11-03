import { Box, Text, Heading, Flex, Button, Image } from "@chakra-ui/react";
import star from '../assets/star.svg';
import heart from '../assets/heart.svg';
import setHeart from '../assets/purple_heart.svg';
import { addToCart } from "../http/cartAPI";
import useToastNotification from "../hooks/useToastNotification";
import { useCallback, useContext } from "react";
import useFavorites from "../hooks/useFavorites";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

const ItemDetails = observer(({ id, name, brandName, price, rating, img }) => {
    const { showToast } = useToastNotification();
    const { cart } = useContext(Context);

    const { like, handleToggleFavorite, isAuth } = useFavorites({ id, name });

    const handleAddToCart = useCallback(async () => {
        if (!isAuth) {
            showToast("Please log in.");
            return;
        }

        await addToCart(id);
        await cart.loadCartItems();
        showToast("Success!", `${name} has been added to your cart.`, "success");
    }, [id, name, isAuth, showToast]);

    return (
        <>
            <Text mb={2} fontSize={{ base: "16px", md: "20px" }}>{brandName}</Text> 
            <Heading fontSize={{ base: "20px", md: "28px" }}>{name}</Heading> 
            
            <Flex mt={4} justifyContent="center" alignItems="center">
                <Text fontSize={{ base: "sm", md: "md" }}>{rating}</Text>
                <Image ml={1} width="18px" height="18px" src={star} alt="Star rating" />
            </Flex>
            
            <Heading mt={4} fontSize={{ base: "20px", md: "28px" }} textAlign="center">${price.toFixed(2)}</Heading>
            
            <Flex 
                mt={6} 
                gap={{ base: "20px", md: "40px" }} 
                w={{ base: "100%", md: "300px", lg: "390px" }} 
                justifyContent="center" 
                alignItems="center" 
                direction={{ base: "column", md: "row" }}
            >
                <Button 
                    p={{ base: 4, md: 5, lg: 6 }} 
                    flex="1"             
                    w="100%"
                    backgroundColor="green.400" 
                    color="white"            
                    fontSize={{  md: "mg", lg: "lg" }} 
                    _hover={{ backgroundColor: "green.500" }} 
                    onClick={handleAddToCart}
                >
                    ADD TO CART
                </Button>

                <Box>
                    <button onClick={handleToggleFavorite}>
                        <img src={like ? setHeart : heart} alt="Add to Favorites" style={{ width: "25px", height: "25px" }} />
                    </button>
                </Box>
            </Flex>
       </>
    );
});

export default ItemDetails;

