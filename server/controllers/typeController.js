const {Type} = require('../models/models');

class TypeController {
    async create(req, res) {
        const {name} = req.body;
        const type = await Type.create({name});
        return res.status(201).json(type);
    }

    async getAll(req, res) {
        const types = await Type.findAll();
        return res.status(200).json(types);
    }

    async removeType(req, res) {
        const {id} = req.params;
        const type = await Type.findOne({where: id})
  
        if (!type) {
            return res.status(404).json({message: 'ID типа товара не найден'})
        }

        await type.destroy()

        return res.status(200).json({message: 'Тип товара успешно удален'})
    }

}

module.exports = new TypeController();