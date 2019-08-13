import { createConnection } from 'mongoose';
import { Reminder, ReminderModel } from './model';
import { reminderSchema } from './schema';

export class DataDriver {
    Reminder: ReminderModel;

    createReminder(reminder: Reminder) {
        return new this.Reminder(reminder).save();
    }

    static async connect(connectionUri: string) {
        const connection = await createConnection(connectionUri, { useNewUrlParser: true, w: 'majority' });
        const driver = new DataDriver();
        driver.Reminder = connection.model('reminder', reminderSchema);
        return driver;
    }
}
