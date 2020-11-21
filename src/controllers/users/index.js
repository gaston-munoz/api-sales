import bcrypt from 'bcryptjs';
import {
    Users
} from '../../models';

export const getAll = async (req, res) => {
    let response = {}
    try {
      const users = await Users.find();
      console.log('USERS', users);

      response = { success: true, users }
      
        
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.messsage };
    }

    res.send(response)
}


export const create = async (req, res) => {
    let response = {}
    try {
      const {
          name,
          lastname,
          email,
          password,
          roles
      } = req.body;

      const salt = await bcrypt.genSalt(12);
      const newPass = await bcrypt.hash(password, salt);
      const newUser = new Users({
          name,
          lastname,
          email,
          password: newPass,
          roles
      })

      console.log(newUser);

      await newUser.save();

      response = { success: true, user: newUser };
        
    } catch (error) {
        console.log(error);

        response = { succes: false, message: error };
    }

    res.send(response);
}
