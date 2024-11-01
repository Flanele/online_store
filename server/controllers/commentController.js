const ApiError = require('../error/ApiError');
const { Item, Comment, User, Rating } = require('../models/models');


class CommentController {
    async addComment(req, res, next) {
        try {
            const { id } = req.params;
            const { text } = req.body;
            const userId = req.user.id;

            const item = await Item.findOne({ where: { id: id } });
            if (!item) {
                return next(ApiError.badRequest('Товар не найден'));
            }

            if (!text || text.trim().length === 0) {
                return next(ApiError.badRequest('Комментарий не может быть пустым'));
            }

            const comment = await Comment.create({
                text,
                userId,
                itemId: id,
            });

            return res.status(201).json(comment);
        } catch (e) {
            console.error(e);
            return next(ApiError.internal('Ошибка при добавлении комментария'));
        };
    };

    async getComments(req, res, next) {
        try {
            const { id } = req.params; 
            let { page, limit } = req.query; 
            page = page || 1; 
            limit = limit || 6; 
            const offset = (page - 1) * limit;
    
            const item = await Item.findOne({ where: { id: id } });
            if (!item) {
                return next(ApiError.badRequest('Товар не найден'));
            }
    
            const comments = await Comment.findAndCountAll({
                where: { itemId: id }, 
                include: [
                    {
                        model: User,
                        attributes: ['username'] 
                    }
                ],
                limit,
                offset,
                order: [['createdAt', 'DESC']], 
            });
    
            const ratings = await Rating.findAll({
                where: { itemId: id },
                include: [{ model: User, attributes: ['username'] }], 
            });
    
            return res.status(200).json({
                comments: comments.rows,
                totalComments: comments.count,
                totalPages: Math.ceil(comments.count / limit),
                currentPage: page,
                ratings: ratings 
            });
        } catch (e) {
            console.error(e);
            return next(ApiError.internal('Ошибка при получении комментариев'));
        }
    }
    
};

module.exports = new CommentController();