import { models } from "mongoose"
import {
    Products
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

export const create = async (req, res) => {
    let  response = {}
    try {
        const {
            name,
            description = '',
            price = {},
            unit = '',
            userId 
        } = req.body;

        const newProduct = new Products({
            name,
            description,
            price,
            unit,
            userId
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