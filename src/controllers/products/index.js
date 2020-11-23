import { models } from "mongoose"
import {
    Category,
    Products,
    Users
} from '../../models'

export const getAll = async (req, res) => {
    let response = {}
    try {
      const products = await Products.find();
      response = { success: true, products }
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.message }
    }

    res.send(response);
}

export const getById = async (req, res) => {
    let response = {}
    try {
      const { id } = req.params;   
      const product = await Products.findById(id);

      if(product) { 
         response = { success: true, product };
      }
      else {
          response = { success: false, message: 'Product not exists' };
      } 
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.messsage };
    }

    res.send(response)
}

export const getUserProducts = async (req, res) => {
    let response = {}
    try {
      const { id: userId } = req.params;
      
      console.log('ID', userId)
      const products = await Products.find({ userId });
      response = { success: true, products }
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.message }
    }

    res.send(response);
}

export const create = async (req, res) => {
    let  response = {}
    try {
        const {
            name,
            description = '',
            price = {},
            unit = '',
            categoryId 
        } = req.body;
        const { _id: userId } = req.user;

        const newProduct = new Products({
            name,
            description,
            price,
            unit,
            userId,
            categoryId
        })

        await newProduct.save();
        response = { success: true, product: newProduct }
    } catch (error) {
        console.log(error);
        response = { success: false, error: error.message }
    }

    res.send(response)
}

export const update = async (req, res) => {
    let response = {}
    try {
        const { 
           product
         } = req.body

        const { id } = req.params;

        const existsCategory = await Category.findById(id);
        if(!existsCategory) throw new Error('Category not exists');

        const existsUser = await Users.findById(id);
        if(!existsUser) throw new Error('User not exists');
        const newProduct = await Products.findByIdAndUpdate({ _id: id }, user , { new: true });
                
        response = { success: true, product: newProduct };
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.message };
    }

    res.send(response);
}
