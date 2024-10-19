const Router = require('express').Router(); 
const itemRouter = require('./itemRouter'); 
const userRouter = require('./userRouter'); 
const brandRouter = require('./brandRouter'); 
const typeRouter = require('./typeRouter'); 
const cartRouter = require('./cartRouter');
const favoriteRouter = require('./favoriteRouter');

Router.use('/user', userRouter); 
Router.use('/type', typeRouter); 
Router.use('/brand', brandRouter); 
Router.use('/item', itemRouter); 
Router.use('/cart', cartRouter);
Router.use('/favorites', favoriteRouter);

module.exports = Router; 