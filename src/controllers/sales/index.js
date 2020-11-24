import { 
    Sales,
    Users
} from '../../models';

export const getAll = async (req, res) => {
    let response = {};
    try {
        const sales = await Sales.find();

        response = { success: true, sales };
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.message };
    }

    res.send(response);
}

export const getById = async (req, res) => {
    let response = {};
    try {
        const { id } = req.params;
        const sale = await Sales.findById(id);
        if(!sale) throw new Error('Sale not exists');

        response = { success: true, sale };
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.message };
    }

    res.send(response);
}

export const getPurchasesByUser = async (req, res) => {
    let response = {};
    try {
        const { _id } = req.user;
        const sales = await Sales.find({ user: _id });

        response = { success: true, sales };
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.message };
    }

    res.send(response);
}

export const getSalesByUser = async (req, res) => { 
    let response = {};
    try {
        const { _id } = req.user;
        const sales = await Sales.find({ seller: _id });

        response = { success: true, sales };
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.message };
    }

    res.send(response);
}

export const create = async (req, res) => {
    let response = {};
    try {
        const { sale } = req.body;
        if(!sale) throw new Error('Sale not exists');

        const { seller /*, personalInformation, products, total, paid, confirmed*/ } = sale;

        const existsSeller = await Users.findOne({ _id: seller, 'roles.rol': 'seller' });
        if(!existsSeller) throw new Error('Seller not exists');
        
        sale.user = req.user._id;
        const newSale = await Sales.create(sale);

        await newSale.save();

        response = { success: true, sale: newSale }
    } catch (error) {
        console.log(error);
        response = { success: false, message: error.message };
    }

    res.send(response);
}