import { Box, Avatar, Text, Flex, Icon } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const CommentCard = ({ username, text, rating, date }) => {
    const renderStars = () => (
        Array.from({ length: 5 }, (_, i) => (
            <Icon 
                as={FaStar} 
                key={i} 
                color={i < rating ? "yellow.400" : "gray.300"} 
                boxSize={4} 
            />
        ))
    );

    return (
        <Box 
            position="relative"
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden" 
            p={5} 
            boxShadow="md" 
            bg="white"
            mb={4}
        >
            <Flex position="absolute" top={4} right={2}>
                {renderStars()}
            </Flex>

            <Flex align="center" mb={4}>
                <Avatar size="md" name={username} bg="black" color="white" />
                <Text ml={3} fontWeight="bold" fontSize="lg">
                    {username}
                </Text>
            </Flex>

            <Text fontSize="md" color="gray.600" mb={5} whiteSpace="pre-wrap">
                {text}
            </Text>

            <Text 
                position="absolute" 
                bottom={2} 
                right={2} 
                fontSize="sm" 
                color="gray.500"
            >
                {date}
            </Text>
        </Box>
    );
};

export default CommentCard;

