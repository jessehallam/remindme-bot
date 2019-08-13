import { Client, DMChannel, GroupDMChannel, TextChannel } from 'discord.js';
import { DataDriver } from './database/driver';

type AnyChannel = TextChannel | DMChannel | GroupDMChannel;

const INTERVAL = 1000;

export function createServer(driver: DataDriver, client: Client) {
    async function poll() {
        try {
            const candidates = await driver.Reminder.find({
                when: {
                    $lt: new Date()
                }
            }).exec();
            if (candidates.length) {
                console.log(`Got ${candidates.length} reminders.`);
                const promises = candidates.map(async reminder => {
                    const channel: AnyChannel = <any>client.channels.get(reminder.channel_id);
                    if (!channel) return;
                    channel.send(`Hey <@${reminder.user_id}>: ${reminder.message}`);
                    return reminder.remove();
                });
                await Promise.all(promises);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setTimeout(poll, INTERVAL);
        }
    }
    setTimeout(poll, INTERVAL);
}
