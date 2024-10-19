const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
});

const Cart = sequelize.define('cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const CartItem = sequelize.define('cart_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
});

const Favorite = sequelize.define('favorite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const FavoriteItem = sequelize.define('favorite_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const Item = sequelize.define('item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.FLOAT, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: false },
    ratingsCount: { type: DataTypes.INTEGER, defaultValue: 0 }
});

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    rate: { type: DataTypes.FLOAT, allowNull: false } 
});

const ItemInfo = sequelize.define('item_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }
});

const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Type.hasMany(Item);
Item.belongsTo(Type);

Brand.hasMany(Item);
Item.belongsTo(Brand);

Item.hasMany(CartItem);
CartItem.belongsTo(Item);

User.hasOne(Favorite);
Favorite.belongsTo(User);

Favorite.hasMany(FavoriteItem);
FavoriteItem.belongsTo(Favorite);

Item.hasMany(FavoriteItem);
FavoriteItem.belongsTo(Item);

Rating.belongsTo(Item);
Rating.belongsTo(User);

Item.hasMany(ItemInfo, { as: 'info' });
ItemInfo.belongsTo(Item);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
    User, Cart, CartItem, Item, Type, Brand, Rating, TypeBrand, ItemInfo, Favorite, FavoriteItem
};
