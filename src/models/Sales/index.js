import mongoose, { Schema, model } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment'

const personalInformationSchema = new Schema({
    name    : String,
    lastname: String,
    email   : String
})

const productsSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Users' },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
})

const salesSchema = new Schema({
    number             : { type: Number },
    seller             : { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    user               : { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    personalInformation: personalInformationSchema,
    products           : { type: [ productsSchema ], required: true },
    total              : { type: Number, default: 0 },
    confirmed          : { type: Boolean, default: false },
    paid               : { type: Boolean, default: false }
},
{
    timestamps: true
})

autoIncrement.initialize(mongoose.connection);
salesSchema.plugin(autoIncrement.plugin, {
    field   : 'number',
    model  : 'Sales',
    startAt: 10000
})

export default model('Sales', salesSchema);
