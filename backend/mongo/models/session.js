import mongoose from 'mongoose'
const { Schema, model } = mongoose;
import softDelete from 'mongoosejs-soft-delete'
import toJson from '@meanie/mongoose-to-json';
import { prePopulate } from '../helpers/population.js';

const SessionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        blocked: {
            type: Boolean,
            default: false,
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
    },
    {
        timestamps: true
    }
);

SessionSchema.pre('find', prePopulate('user'));
SessionSchema.pre('findOne', prePopulate('user'));

SessionSchema.plugin(softDelete)
SessionSchema.plugin(toJson);


const Session = model('Session', SessionSchema)

export default Session;