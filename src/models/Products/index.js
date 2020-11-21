import { Schema, model } from 'mongoose';

const priceSchema = new Schema({
    amount: { type: Number, default: 0 },
    quant  : { type: Number, default: 1 }
})

const productSchema = new Schema({
    name       : { type: String, trim: true, unique: true, required: true },
    description: { type: String, trim: true },
    price      : priceSchema,
    unit       : { type: String, default: 'unit', 'enum': [ 'unit', 'kilo', 'metro' ] }
},
{
    timestamps: true
})

export default model('Products', productSchema);