import * as discord from 'discord.js';
import { config } from './config';
import { DataDriver } from './database/driver';
import { parseMessage } from './parse';

export function createClient(driver: DataDriver) {
    const client = new discord.Client();

    client.on('ready', () => {
        console.log('Discord.js is ready.');
    });

    client.on('message', async message => {
        try {
            if (message.content.startsWith(config.bot.command_prefix)) {
                const channel_id = message.channel.id;
                const who = message.author.id;
                const content = message.content.substr(config.bot.command_prefix.length);
                const parsed = parseMessage(content);

                if (!parsed) {
                    message.reply("Sorry, I didn't understand that.");
                    return;
                }

                const reminder = await driver.createReminder({
                    channel_id,
                    message: parsed.message,
                    when: parsed.date,
                    user_id: who
                });

                const embed = new discord.RichEmbed()
                    .setColor('#ed1b64')
                    .addField('Reminder Set!', reminder.message)
                    .setTimestamp(reminder.when);

                message.reply({ embed });
            }
        } catch (err) {
            console.error('Error interpreting message', err);
        }
    });

    client.on('error', error => {
        console.error('Discord client error', error);
    });

    return client;
}
