import { Schema } from 'mongoose';

export const reminderSchema = new Schema(
    {
        channel_id: { $type: String, required: true },
        message: { $type: String, required: true },
        when: { $type: Date, required: true },
        user_id: { $type: String, required: true }
    },
    {
        typeKey: '$type',
        writeConcern: { w: 'majority' }
    }
);
