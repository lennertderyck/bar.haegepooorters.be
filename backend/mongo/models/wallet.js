import mongoose from 'mongoose'
const { Schema, model } = mongoose;
import softDelete from 'mongoosejs-soft-delete'
import toJson from '@meanie/mongoose-to-json';

const WalletSchema = new Schema({
    label: String,
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

const Wallet = model('Wallet', WalletSchema);

export default Wallet;