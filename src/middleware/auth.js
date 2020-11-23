import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Users } from '../models';

const { SECRET } = process.env;

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log('TOKEN', token);
        const user = jwt.verify(token, SECRET);

        const existsUser = await Users.find({ _id: user._id, email: user.email });

        if(!existsUser) throw new Error();

        next();
        
    } catch (error) {
        console.log(error);

        res.send({ succes: false, message: 'Not authorized to access this resource' })
    }
}