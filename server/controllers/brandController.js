const {Brand} = require('../models/models');

class BrandController {
    async create (req, res) {
        const {name} = req.body;
        const brand = await Brand.create({name});
        return res.status(201).json(brand);
    }

    async getAll (req, res) {
        const brands = await Brand.findAll();
        return res.status(200).json(brands);
    }

    async removeBrand (req, res) {
        const {id} = req.params;
        const brand = await Brand.findOne({where: id});

        if (!brand) {
            return res.status(404).json({message: 'ID бренда не найден'});
        }

        await brand.destroy();

        return res.status(200).json({message: 'Брен успешно удален'});
    }
}

module.exports = new BrandController;