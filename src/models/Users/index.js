import mongoose, { Schema, model } from 'mongoose';

const rolSchema = new Schema({
    rol: { type: String, 'enum': [ 'customer','seller', 'admin' ] }
})

const userSchema = new Schema({
    name    : { type: String, trim: true, required: true },
    lastname : { type: String, trim: true },
    email   : { type: String, unique: true, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    roles     : { type: [ rolSchema ] }
},
{
    timestamps: true
})

export default model('Users', userSchema);