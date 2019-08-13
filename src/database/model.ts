import { Document, Model } from 'mongoose';

export interface Reminder {
    channel_id: string;
    user_id: string;
    when: Date;
    message: string;
}

export type ReminderDocument = Reminder & Document;
export type ReminderModel = Model<ReminderDocument>;
