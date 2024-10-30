const {Favorite, FavoriteItem, Item} = require('../models/models');
const ApiError = require('../error/ApiError');

class FavoriteController {

    async getFavorites (req, res, next) {
        try {
            const userId = req.user.id;
            const favorites = await Favorite.findOne({
            where: { userId },
            include: [{
                model: FavoriteItem,
                include: [{
                    model: Item,
                    attributes: ['id', 'name', 'price', 'img', 'brandId', 'rating']
                    }]
                }]
            });

        return res.status(200).json(favorites);

        } catch(e) {
            console.log(e);
            return next(ApiError.badRequest('Не удалось получить избранное пользователя'));
        }
        
    }

    async addToFavorites(req, res, next) {
        try {
            const { itemId } = req.body; 
            const userId = req.user.id;
    
            const item = await Item.findOne({ where: { id: itemId } });
            if (!item) {
                return next(ApiError.badRequest('Товар не найден'));
            }
    
            let favorite = await Favorite.findOne({ where: { userId } });
            if (!favorite) {
                return next(ApiError.badRequest('Не удалось найти избранные пользователя'));
            }
    
            const existingFavoriteItem = await FavoriteItem.findOne({
                where: { favoriteId: favorite.id, itemId }
            });
            if (existingFavoriteItem) {
                return next(ApiError.badRequest('Товар уже добавлен в избранное'));
            }
    
            const favoriteItem = await FavoriteItem.create({ favoriteId: favorite.id, itemId });
            return res.status(200).json({ message: 'Товар добавлен в избранное', favoriteItem });
    
        } catch (error) {
            console.error(error);
            return next(ApiError.badRequest('Не удалось добавить товар в избранное'));
        }
    }
    

    async removeFavorite (req, res, next) {
        try {
            const {id} = req.params;
            const userId = req.user.id;

            const favorite = await Favorite.findOne({ where: { userId } });
            if (!favorite) {
                return next(ApiError.badRequest('Избранное не найдено'));
            }

            const favoriteItem = await FavoriteItem.findOne({ where: { id, favoriteId: favorite.id } });
            if (!favoriteItem) {
                return next(ApiError.badRequest('Товар в избранном не найден'));
            }

            await FavoriteItem.destroy({ where: { id } });
            return res.json({ message: 'Товар успешно удален из избранных' });

        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }

};

module.exports = new FavoriteController();