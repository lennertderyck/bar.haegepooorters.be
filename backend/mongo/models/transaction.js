import mongoose from 'mongoose'
const { Schema, model } = mongoose;
import softDelete from 'mongoosejs-soft-delete'
import toJson from '@meanie/mongoose-to-json';
import { prePopulate } from '../helpers/population.js';

const TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            amount: Number,
        },
    ],
    wallet: {
        type: Schema.Types.ObjectId,
        ref: 'UserWallet',
    },
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

TransactionSchema.pre('find', prePopulate(['user', 'wallet', 'items.product']));
TransactionSchema.pre('findOne', prePopulate(['user', 'wallet', 'items.product']));

const Transaction = model('Transaction', TransactionSchema)

export default Transaction;