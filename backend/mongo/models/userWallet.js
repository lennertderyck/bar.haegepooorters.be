import mongoose from 'mongoose'
const { Schema, model } = mongoose;
import softDelete from 'mongoosejs-soft-delete'
import toJson from '@meanie/mongoose-to-json';
import { prePopulate } from '../helpers/population.js';

const UserWalletSchema = new Schema({
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'CreditProvider',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    balance: {
        type: Number,
        default: 0
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

UserWalletSchema.pre('find', prePopulate('provider'));
UserWalletSchema.pre('findOne', prePopulate('provider'));

const UserWallet = model('UserWallet', UserWalletSchema);

export default UserWallet;