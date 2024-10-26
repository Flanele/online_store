const ApiError = require('../error/ApiError');
const { Item, ItemInfo, Rating } = require('../models/models');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

class ItemController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
    
            console.log('Received data:', { name, price, brandId, typeId, info });
    
            let filename = uuidv4() + ".jpg";
            const staticPath = path.resolve(__dirname, '..', 'static');
    
            if (!fs.existsSync(staticPath)) {
                fs.mkdirSync(staticPath);
            }
    
            await img.mv(path.resolve(staticPath, filename));
    
            const item = await Item.create({ name, price, brandId, typeId, img: filename });
    
            console.log('Created Item:', item);
    
            if (info) {
                info = JSON.parse(info);
                console.log('Parsed info:', info);
                info.forEach(i => 
                    ItemInfo.create({
                        title: i.title,
                        description: i.description,
                        itemId: item.id
                    })
                );

            };
    
            return res.status(201).json(item);
    
        } catch (e) {
            console.error(e);
            next(ApiError.badRequest(e.message));
        }
    }
    
    
    async getAll (req, res) {
        let {brandId, typeId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 12;
        let offset = page * limit - limit;
        let items;

        if (!brandId && !typeId) {
            items = await Item.findAndCountAll({limit, offset});
        }

        if (brandId && !typeId) {
            items = await Item.findAndCountAll({where: {brandId}, limit, offset});
        }

        if (!brandId && typeId) {
            items = await Item.findAndCountAll({where: {typeId}, limit, offset});
        }

        if (brandId && typeId) {
            items = await Item.findAndCountAll({where: {brandId, typeId}, limit, offset});
        }

        return res.json(items);
    }

    async getOne (req, res) {
        const {id} = req.params;
        const item = await Item.findOne({
            where: {id},
            include: [{model: ItemInfo, as: 'info'}]
        });

        if (!id) {
            return next(ApiError.badRequest('ID is required'));
        }

        return res.status(200).json(item);
    }

    async updateItem(req, res, next) {
        try {
            const { id } = req.params;
            let { name, price, brandId, typeId, info } = req.body;
    
            const item = await Item.findOne({ where: { id } });
    
            if (!item) {
                return res.status(404).json({ message: 'Товар не найден' });
            }
    
            item.name = name || item.name;
            item.price = price || item.price;
            item.brandId = brandId || item.brandId;
            item.typeId = typeId || item.typeId;
    
            if (req.files && req.files.img) {
                const { img } = req.files;
                let filename = uuidv4() + ".jpg";
                const staticPath = path.resolve(__dirname, '..', 'static');
    
                if (!fs.existsSync(staticPath)) {
                    fs.mkdirSync(staticPath);
                }
    
                img.mv(path.resolve(staticPath, filename));
                item.img = filename;
            }
    
            await item.save();
    
            if (info) {
                info = JSON.parse(info);
    
                const existingInfos = await ItemInfo.findAll({ where: { itemId: id } });
    
                for (const existingInfo of existingInfos) {
                    const isNewDescription = info.find(i => i.title === existingInfo.title);
                    if (!isNewDescription) {
                        await existingInfo.destroy();
                    }
                }
    
                for (const i of info) {
                    let existingInfo = await ItemInfo.findOne({
                        where: { itemId: id, title: i.title }
                    });
    
                    if (existingInfo) {
                        existingInfo.description = i.description;
                        await existingInfo.save();
                    } else {
                        await ItemInfo.create({
                            title: i.title,
                            description: i.description,
                            itemId: id
                        });
                    }
                }
            }
    
            return res.status(200).json(item);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    
    

    async removeItem (req, res, next) {
        try {
            const {id} = req.params;
            const item = await Item.findOne({where: {id}});
            
            if (!item) {
                return res.status(404).json({message: 'Товар не найден'});
            }
    
            await item.destroy();
            return res.status(200).json({message: 'Товар успешно удален'});
    
        } catch (e) {
            next(ApiError.internal('Ошибка при удалении товара: ' + e.message));
        }
    }

    async addRating(req, res, next) {
        try {
            const { itemId, rate } = req.body; 
            const userId = req.user.id;
    
            const item = await Item.findOne({ where: { id: itemId } });

            if (rate < 1 || rate > 5) {
                return next(ApiError.badRequest('Рейтинг должен быть числом от 1 до 5'));
            }
    
            if (!item) {
                return next(ApiError.badRequest('Товар не найден'));
            }
    
            const existingRating = await Rating.findOne({ where: { itemId, userId } });
    
            let newAverageRating;
    
            if (existingRating) {
                existingRating.rate = rate;
                await existingRating.save();
            } else {
                await Rating.create({ itemId, userId, rate });
                item.ratingsCount += 1;
            }
    
            const ratings = await Rating.findAll({ where: { itemId } });
    
            const totalRating = ratings.reduce((sum, r) => sum + r.rate, 0);
            newAverageRating = totalRating / ratings.length;
    
            await Item.update({
                rating: newAverageRating,
                ratingsCount: ratings.length
            }, {
                where: { id: itemId }
            });
    
            return res.status(200).json({ message: 'Рейтинг успешно добавлен или обновлён' });
        } catch (e) {
            console.error(e);
            return next(ApiError.badRequest('Не удалось добавить рейтинг'));
        }
    }
    

    async getRatings(req, res, next) {
        try {
            const { id } = req.params; 
            const ratings = await Rating.findAll({ where: { itemId: id } });

            return res.status(200).json(ratings);
        } catch (e) {
            console.error(e);
            return next(ApiError.badRequest('Не удалось получить рейтинги'));
        }
    }
}

module.exports = new ItemController();
