import { Box, Heading, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { addComment, addRating, fetchCommentsWithRatings } from "../http/itemAPI";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList";
import Pagination from "./Pagination";
import CommentForm from "./CommentForm";

const CommentsSection = observer(() => {
    const {comment} = useContext(Context);
    const id = useParams().id;

    useEffect(() => {
        const loadComments = async () => {
            try {
                const commentsData = await fetchCommentsWithRatings(id, comment.page, comment.limit); 
                comment.setComments(commentsData.comments); 
                comment.setRatings(commentsData.ratings); 
                comment.setTotalCount(commentsData.totalComments); 
            } catch (error) {
                console.error("Ошибка при загрузке комментариев:", error);
            }
        };
    
        loadComments();
    }, [id, comment.page, comment.limit]);

    const onSubmit = async ({ commentText, rating }) => {
        try {
            await addComment(id, { text: commentText });
            await addRating(id, { rate: rating });
            
            const commentsData = await fetchCommentsWithRatings(id, comment.page, comment.limit); 
            comment.setComments(commentsData.comments); 
            comment.setRatings(commentsData.ratings); 
            comment.setTotalCount(commentsData.totalComments);
        } catch (error) {
            console.error("Ошибка при добавлении комментария и рейтинга:", error);
        };
    };

    const commentsEmpty = comment.comments.length === 0;
    const comments = comment.comments || [];
    const ratings = comment.ratings || [];

    const totalPages = Math.ceil(comment.totalCount / comment.limit);

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
                            currentPage={comment.page} 
                            pageCount={totalPages} 
                            onPageChange={(page) => comment.setPage(page)} 
                        />
                    </Box>
                    
                 </>
            )}
        </Box>
        
    );
});

export default CommentsSection;