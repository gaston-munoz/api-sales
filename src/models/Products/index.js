import mongoose, { Schema, model } from 'mongoose';

const priceSchema = new Schema({
    amount: { type: Number, default: 0 },
    quant  : { type: Number, default: 1 }
})

const productSchema = new Schema({
    name       : { type: String, trim: true, unique: true, required: true },
    description: { type: String, trim: true },
    price      : priceSchema,
    unit       : { type: String, default: 'unit', 'enum': [ 'unit', 'kilo', 'metro' ] },
    categoryId : { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    userId     : { type: Schema.Types.ObjectId, required: true, ref: 'Users' }
},
{
    timestamps: true
})

export default model('Products', productSchema);