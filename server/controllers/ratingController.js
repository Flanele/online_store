const ApiError = require('../error/ApiError');
const { Item, Rating } = require('../models/models');

class RatingController {
    async addRating(req, res, next) {
        try {
            const { id } = req.params;
            const { rate } = req.body;
            const userId = req.user.id;
    
            if (rate < 1 || rate > 5) {
                return next(ApiError.badRequest('Рейтинг должен быть числом от 1 до 5'));
            }
    
            const item = await Item.findOne({ where: { id } });
            if (!item) {
                return next(ApiError.badRequest('Товар не найден'));
            }
    
            const existingRating = await Rating.findOne({ where: { itemId: id, userId } });
    
            if (existingRating) {
                existingRating.rate = rate;
                await existingRating.save();
            } else {
                await Rating.create({ itemId: id, userId, rate });
                item.ratingsCount += 1;
            }
    
            const ratings = await Rating.findAll({ where: { itemId: id } });
    
            const totalRating = ratings.reduce((sum, r) => sum + r.rate, 0);
            const newAverageRating = totalRating / ratings.length;
    
            const roundedAverageRating = Math.round(newAverageRating * 10) / 10;
    
            await Item.update(
                { rating: roundedAverageRating, ratingsCount: ratings.length },
                { where: { id } }
            );
    
            return res.status(200).json({ message: 'Рейтинг успешно добавлен или обновлён', averageRating: roundedAverageRating });
        } catch (e) {
            console.error(e);
            return next(ApiError.badRequest('Не удалось добавить рейтинг'));
        }
    };
    
    

    async getRatings(req, res, next) {
        try {
            const { id } = req.params; 
            const ratings = await Rating.findAll({ where: { itemId: id } });

            return res.status(200).json(ratings);
        } catch (e) {
            console.error(e);
            return next(ApiError.badRequest('Не удалось получить рейтинги'));
        };
    };

};

module.exports = new RatingController();