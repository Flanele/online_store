const ApiError = require('../error/ApiError');
const { Item, ItemInfo  } = require('../models/models');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize'); 


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
        };
    };
    
    
   async getAll(req, res) {
    let { brandId, typeId, limit, page, searchTerm } = req.query; 
    page = page || 1;
    limit = limit || 12;
    let offset = page * limit - limit;
    let items;

    const whereCondition = {};

    if (brandId) whereCondition.brandId = brandId;
    if (typeId) whereCondition.typeId = typeId;
    if (searchTerm) whereCondition.name = { [Op.iLike]: `%${searchTerm}%` }; 

    items = await Item.findAndCountAll({
        where: whereCondition,
        limit,
        offset
    });

    return res.json(items);
};


    async getOne (req, res) {
        const {id} = req.params;
        const item = await Item.findOne({
            where: {id},
            include: [{model: ItemInfo, as: 'info'}]
        });

        if (!id) {
            return next(ApiError.badRequest('ID is required'));
        };

        return res.status(200).json(item);
    };

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
            };
    
            await item.save();
    
            if (info) {
                info = JSON.parse(info);
    
                const existingInfos = await ItemInfo.findAll({ where: { itemId: id } });
    
                for (const existingInfo of existingInfos) {
                    const isPresentInNewData = info.some(newInfo => newInfo.title === existingInfo.title && newInfo.description === existingInfo.description);
                    if (!isPresentInNewData) {
                        await existingInfo.destroy();
                    }
                }
    
                for (const i of info) {
                    await ItemInfo.create({
                        title: i.title,
                        description: i.description,
                        itemId: id
                    });
                };
            };
    
            return res.status(200).json(item);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        };
    };
    
    
    
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
        };
    };

};

module.exports = new ItemController();
