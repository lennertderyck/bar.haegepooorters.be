import mongoose from 'mongoose'
const { Schema, model } = mongoose;
import softDelete from 'mongoosejs-soft-delete'
import toJson from '@meanie/mongoose-to-json';

const ProductCategorySchema = new Schema({
    name: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deleted_at: Date,
})
.plugin(softDelete)
.plugin(toJson);


const ProductCategory = model('ProductCategory', ProductCategorySchema)

export default ProductCategory;