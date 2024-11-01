import { Box, Textarea, Button, Flex, Icon, Text, Stack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Context } from "../main";

const CommentForm = ({ onSubmit }) => {
    const [commentText, setCommentText] = useState("");
    const [rating, setRating] = useState(0);

    const {user} = useContext(Context);

    const isAuth = user.isAuth;

    const handleTextChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleStarClick = (rate) => {
        setRating(rate);
    };

    const handleSubmit = () => {
        onSubmit({ commentText, rating });
        setCommentText(""); 
        setRating(0);      
    };

    return (
        <Box p={4} mb={7} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
            <Stack spacing={4}>
                <Textarea
                    placeholder={isAuth ? "Write your comment here..." : "Please log in to write a comment."}
                    value={commentText}
                    onChange={handleTextChange}
                    size="md"
                    wrap="soft"
                    mb={4}
                />

                <Flex align="center" justifyContent="space-between">
                    <Flex gap={3}>
                        <Text mr={2} fontWeight="bold">
                            Rate the product:
                        </Text>

                        {Array.from({ length: 5 }, (_, i) => (
                            <Icon
                                key={i}
                                as={FaStar}
                                boxSize={6}
                                color={i < rating ? "yellow.400" : "gray.300"}
                                cursor="pointer"
                                onClick={() => handleStarClick(i + 1)} 
                            />
                        ))}


                    </Flex>
                    

                       <Button
                    backgroundColor="blue.800"
                    color="white"
                    width="25%"
                    _hover={{ backgroundColor: "blue.700" }}
                    onClick={handleSubmit}
                    isDisabled={!commentText || !rating || !isAuth} 
                >
                    Submit Comment
                </Button>
                </Flex>

             
            </Stack>
        </Box>
    );
};

export default CommentForm;
