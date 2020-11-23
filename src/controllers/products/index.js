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
      console.log('PRODUCTS', products)
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
      console.log('USERS', product);

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


export const create = async (req, res) => {
    let  response = {}
    try {
        const {
            name,
            description = '',
            price = {},
            unit = '',
            userId,
            categoryId 
        } = req.body;

        const newProduct = new Products({
            name,
            description,
            price,
            unit,
            userId,
            categoryId
        })

        await newProduct.save();
        console.log(newProduct);
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
        
        console.log('UPD USR', newProduct); 
        
        response = { success: true, product: newProduct };
   

    } catch (error) {
        console.log(error);
        response = { success: false, message: error.message };
    }

    res.send(response);
}
