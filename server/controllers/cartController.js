const {Cart, CartItem, Item} = require('../models/models');
const ApiError = require('../error/ApiError');

class CartController {
    async getCart(req, res, next) {
        try {
            const userId = req.user.id;
            const cart = await Cart.findOne({
                where: { userId },
                include: [{
                    model: CartItem,
                    include: [{
                        model: Item,
                        attributes: ['id', 'name', 'price', 'img', 'brandId']
                    }]
                }]
            });

            return res.json(cart);
        } catch (error) {
            console.error(error);
            return next(ApiError.badRequest('Не удалось получить корзину'));
        }
    }

    async addToCart(req, res, next) {
        try {
            const { itemId } = req.body; 
            const userId = req.user.id;
    
            const item = await Item.findOne({ where: { id: itemId } });
    
            if (!item) {
                return next(ApiError.badRequest('Товар не найден'));
            }
    
            let cart = await Cart.findOne({ where: { userId } });
    
            if (!cart) {
                return next(ApiError.badRequest('Корзина пользователя не найдена'));
            }
    
            let cartItem = await CartItem.findOne({ 
                where: { 
                    cartId: cart.id, 
                    itemId 
                } 
            });
    
            if (cartItem) {
                cartItem.quantity += 1;  
                await cartItem.save();    
                return res.status(200).json({ message: 'Количество товара в корзине увеличено', cartItem });
            } else {
                cartItem = await CartItem.create({ cartId: cart.id, itemId, quantity: 1 });
                return res.status(200).json({ message: 'Товар добавлен в корзину', cartItem });
            }
    
        } catch (error) {
            console.error(error);
            return next(ApiError.badRequest('Не удалось добавить товар в корзину'));
        }
    }

    async removeCartItem (req, res, next) {
        try {
            const {id} = req.params;
            const userId = req.user.id;

            const cart = await Cart.findOne({ where: { userId } });

            const cartItem = await CartItem.findOne({ where: { id, cartId: cart.id } });
            if (!cartItem) {
                return next(ApiError.badRequest('Товар в корзине не найден'));
            }

            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                await cartItem.save();
                return res.json({ message: 'Количество товара уменьшено', cartItem });
            }

            await CartItem.destroy({ where: { id } });
            return res.json({ message: 'Товар успешно удален из корзины' });

        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }
    

};

module.exports = new CartController();
