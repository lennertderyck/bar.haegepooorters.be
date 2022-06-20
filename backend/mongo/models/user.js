import mongoose from 'mongoose'
const { Schema, model } = mongoose;
import softDelete from 'mongoosejs-soft-delete'
import toJson from '@meanie/mongoose-to-json';

const UserSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    pin: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deleted_at: Date,
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        default: '61eec55b38e0766ab63c049c'
    }
})
.plugin(softDelete)
.plugin(toJson);

UserSchema.virtual('wallets', {
    ref: 'Wallet',
    localField: '_id',
    foreignField: 'user',
})

const User = model('User', UserSchema)

export default User;