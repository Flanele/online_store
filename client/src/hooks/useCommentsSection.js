import { useContext, useEffect } from "react";
import { Context } from "../main";
import { addComment, addRating, fetchCommentsWithRatings } from "../http/itemAPI";
import { useParams } from "react-router-dom";

const useCommentsSection = () => {
    const { comment } = useContext(Context);
    const { id } = useParams();

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
        }
    };

    const commentsEmpty = comment.comments.length === 0;
    const comments = comment.comments || [];
    const ratings = comment.ratings || [];
    const totalPages = Math.ceil(comment.totalCount / comment.limit);

    return {
        commentsEmpty,
        comments,
        ratings,
        totalPages,
        currentPage: comment.page,
        onSubmit,
        setPage: (page) => comment.setPage(page),
    };
};

export default useCommentsSection;
