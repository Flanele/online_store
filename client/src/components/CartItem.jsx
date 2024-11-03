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
            w="100%"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            alignItems="center"
            justifyContent="space-between"
            boxShadow="sm"
            flexDirection={{ base: "column", md: "row" }}
            mb={4}
            position="relative"
        >
            <Image
                src={`${apiUrl}/${item.item.img}`}
                alt={item.item.name}
                boxSize={{ base: "100px", md: "120px" }}
                objectFit="cover"
                borderRadius="md"
                mb={{ base: 4, md: 0 }}
                mr={{ md: 10 }}
                onClick={useCallback(() => navigate(ITEM_ROUTE + '/' + item.item.id))}
                cursor="pointer"
            />

            <Box flex="1" mx={{ base: 0, md: 4 }} textAlign={{ base: "center", md: "left" }}>
                <Text
                    fontWeight="600"
                    fontSize={{ base: "md", md: "lg" }}
                    mb={1}
                    cursor="pointer"
                    onClick={useCallback(() => navigate(ITEM_ROUTE + '/' + item.item.id))}
                >
                    {item.item.name}
                </Text>
                <Text fontSize={{ base: "md", md: "xl" }} color="gray.500">
                    ${item.item.price.toFixed(2)}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" mt={1}>
                    Quantity: {item.quantity}
                </Text>
            </Box>

            <Button
                p={{ base: 1, md: 2 }}
                size="sm"
                leftIcon={<CloseIcon />}
                bg="black"
                color="white"
                _hover={{ backgroundColor: "gray.600" }}
                onClick={() => onClick(item.id)}
                position={{ base: "absolute", md: "static" }}
                top={{ base: "8px", md: "auto" }}
                right={{ base: "8px", md: "auto" }}
                mt={{ base: 0, md: 0 }}
                boxSize={{ base: "24px", md: "auto" }}  
            />
        </Flex>
    );
};

export default CartItem;
