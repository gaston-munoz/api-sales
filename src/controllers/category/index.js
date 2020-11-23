import {
    Category
} from '../../models'

export const getAll = async (req, res) => {
    let response = {}
    try {
      const categories = await Category.find();

      response = { success: true, categories }        
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

        const category = await Category.findById(id);

        if(!category) throw new Error('Category not exists');

        response = { success: true, category };
        
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.message };
    }

    res.send(response);
}

export const create = async (req, res) => {
    let  response = {}
    try {
        const {
            category
        } = req.body;

        if(!category) throw new Error('Category data not exists');

        const { name, description } = category;

        const newCategory = new Category({
            name,
            description
        })
        await newCategory.save();

        response = { success: true, category: newCategory }        
    } catch (error) {
        console.log(error);
        response = { success: false, error: error.message }

    }

    res.send(response)
}

export const update = async (req,res) => {
    let response = {};
    try {
        const { id } = req.params;
        const { category } = req.body;

        if(!category) throw new Error('Category data not exists');

        const existsCategory = await Category.findById(id);

        if(!existsCategory) throw new Error('Category not exists');

        const newCategory = await Category.findByIdAndUpdate({ _id: id }, category, { new: true })

        response = { success: true, category: newCategory }
        
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.message };
    }

    res.send(response);
}