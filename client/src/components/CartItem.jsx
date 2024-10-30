import { Box, Text, Button, Flex, Image } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { ITEM_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const CartItem = ({ item, onClick }) => {
    const navigate = useNavigate();

    return (
        <Flex
            w="80%"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            alignItems="center"
            justifyContent="space-between"
            boxShadow="sm"
        >
            <Image
                src={`${apiUrl}/${item.item.img}`} 
                alt={item.item.name}
                boxSize="120px"
                objectFit="cover"
                borderRadius="md"
                mr={10}
                onClick={useCallback(() => navigate(ITEM_ROUTE + '/' + item.item.id))}
                cursor="pointer"
            />

            <Box flex="1" mx={4}>
                <Text 
                    fontWeight="600" 
                    fontSize="lg" mb={1} 
                    cursor="pointer" 
                    onClick={useCallback(() => navigate(ITEM_ROUTE + '/' + item.item.id))}
                >
                    {item.item.name}
                </Text>
                <Text fontSize="xl" color="gray.500">
                    ${item.item.price.toFixed(2)}
                </Text>
                <Text fontSize="md" color="gray.600" mt={1}>
                    Quantity: {item.quantity} 
                </Text>
            </Box>

            <Button
                p={2} pl={3}
                size="sm"
                leftIcon={<CloseIcon />}
                bg="black" 
                color="white" 
                _hover={{ backgroundColor: "gray.600" }}
                onClick={() => onClick(item.id)}
            >
            </Button>
        </Flex>
    );
};

export default CartItem;
