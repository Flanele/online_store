import { Box, Heading, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import useCommentsSection from "../hooks/useCommentsSection";
import CommentsList from "./CommentsList";
import Pagination from "./Pagination";
import CommentForm from "./CommentForm";

const CommentsSection = observer(() => {
    const {
        commentsEmpty,
        comments,
        ratings,
        totalPages,
        currentPage,
        onSubmit,
        setPage,
    } = useCommentsSection();

    return (
        <Box>
            <Heading mb={7} fontSize="24px">Reviews:</Heading>
            <CommentForm onSubmit={onSubmit} />
            {commentsEmpty ? (
                <Text mt={8}>There are no reviews for this product yet. You can write the first one!</Text>
            ) : (
                <>                             
                    <CommentsList comments={comments} ratings={ratings} />
                    <Box mt={10}>
                        <Pagination  
                            currentPage={currentPage} 
                            pageCount={totalPages} 
                            onPageChange={setPage} 
                        />
                    </Box>
                 </>
            )}
        </Box>
    );
});

export default CommentsSection;
