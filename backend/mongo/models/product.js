import mongoose from 'mongoose'
const { Schema, model } = mongoose;
import softDelete from 'mongoosejs-soft-delete'
import toJson from '@meanie/mongoose-to-json';

const ProductSchema = new Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    available: Boolean,
    quantity: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deleted_at: Date,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'ProductCategory',
    },
})
.plugin(softDelete)
.plugin(toJson);


const Product = model('Product', ProductSchema)

export default Product;