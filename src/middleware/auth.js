import jwt from 'jsonwebtoken';
import { Users } from '../models';

const { SECRET } = process.env;

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if(!token) throw new Error();

        const user = jwt.verify(token, SECRET);
        const existsUser = await Users.findOne({ _id: user._id, email: user.email });
        if(!existsUser) throw new Error();

        req.user = existsUser;
        req.token = token;
        next();
    } catch (error) {
        console.log(error);

        res.send({ success: false, message: 'Not authorized to access this resource' })
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const user = jwt.verify(token, SECRET);
        const existsUser = await Users.find({ _id: user._id, email: user.email, isAdmin: true });
        if(!existsUser) throw new Error();

        req.user = existsUser
        req.token = token
        next();
    } catch (error) {
        console.log(error);
        res.send({ succes: false, message: 'Not authorized to access this resource' })
    }
}
