import mongoose from 'mongoose'
const { Schema, model } = mongoose;
import softDelete from 'mongoosejs-soft-delete'
import toJson from '@meanie/mongoose-to-json';

const TransactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
    }],
    wallet: {
        type: Schema.Types.ObjectId,
        ref: 'Wallet',
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

const Transaction = model('Transaction', TransactionSchema)

export default Transaction;