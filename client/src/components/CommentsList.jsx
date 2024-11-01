import { observer } from "mobx-react-lite";
import CommentCard from "./CommentCard";

const CommentsList = observer(({ comments, ratings }) => {
    return (
        comments.map((item, index) => {
            const commentRating = ratings.find(rating => rating.userId === item.userId)?.rate || 0;
            const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

            return (
                <CommentCard 
                    key={index} 
                    text={item.text} 
                    username={item.user.username} 
                    rating={commentRating} 
                    date={formattedDate} 
                />
            );
        })
    );
});

export default CommentsList;
