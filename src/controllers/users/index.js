import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    Users
} from '../../models';
import { validateEmail } from '../../utils';

const { SECRET } = process.env;

export const getAll = async (req, res) => {
    let response = {}
    try {
      const users = await Users.find({}, { password: 0 });

      response = { success: true, users }
      
        
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.messsage };
    }

    res.send(response)
}

export const getById = async (req, res) => {
    let response = {}
    try {
      const { id } = req.params;   
      const user = await Users.findById(id, { password: 0 });

      if(user) { 
         response = { success: true, user };
      }
      else {
          response = { success: false, message: 'User not exists' };
      } 
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.messsage };
    }

    res.send(response)
}


export const create = async (req, res) => {
    let response = {}
    try {
      const { user } = req.body;

      if(!user) throw new Error('User data not exists');

      const {
        name,
        password,
        lastname,
        email,
        isAdmin,
      } = user;

      if(!validateEmail(email)) throw new Error('Email is not in the correct format');

      const salt = await bcrypt.genSalt(12);
      const newPass = await bcrypt.hash(password, salt);
      const newUser = new Users({
          name,
          lastname,
          isAdmin,
          email,
          password: newPass,
      })

      await newUser.save();

      response = { success: true, user: newUser };
    } catch (error) {
        console.log(error);

        response = { succes: false, message: error.message };
    }

    res.send(response);
}

export const update = async (req, res) => {
    let response = {}
    try {
        const { 
           user
         } = req.body

        const { id } = req.params;

        if(!validateEmail(user.email)) throw new Error('Email not have correct format');

        const existsUser = await Users.findById(id);
        if(!existsUser) throw new Error('User not exists');

        if(user.password) {
            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(user.password, salt);
        }

        const newUser = await Users.findByIdAndUpdate({ _id: id }, user , { new: true });
                
        response = { success: true, user: newUser };
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.message };
    }

    res.send(response);
}

export const signIn = async (req, res) => {
    let response = {};
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        
        if(!user) throw new Error('Email wrong');

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw new Error('Password wrong');
        const token = jwt.sign({ _id: user._id, name: user.name, email, password }, SECRET, { expiresIn: '1 days' });

        response = { success: true,  user, token }        
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.message };
    }

    res.send(response);
}