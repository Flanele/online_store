const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Cart, Favorite} = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
};

class UserController {
    async registration (req, res, next) {
        const {email, password, role, username} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'));
        }

        if (!username) {
            return next(ApiError.badRequest('Пожалуйта, введите имя пользователя'));
        }

        if (password.length < 6) {
            return next(ApiError.badRequest('Пароль должен содержать не меньше шести символов'));
        }

        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, role, password: hashPassword, username});
        const cart = await Cart.create({userId: user.id});
        const favorite = await Favorite.create({userId: user.id});
        const token = generateJwt(user.id, user.email, user.role);

        return res.status(201).json({token});
    }

    async login (req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});

        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }

        let comparedPassword = bcrypt.compareSync(password, user.password);
        if (!comparedPassword) {
            return next(ApiError.internal('Неверный пароль пользователя'));
        }

        const token = generateJwt(user.id, user.email, user.role);
        return res.status(200).json({token});
    }

    async check (req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.atatus(200).json({token});

    }
};

module.exports = new UserController();