import { createClient } from './bot';
import { config } from './config';
import { DataDriver } from './database/driver';
import { createServer } from './server';

export async function app() {
    const data = await DataDriver.connect(config.data.connection_uri);
    const client = createClient(data);
    const server = createServer(data, client);

    client.login(config.bot.login_token);
}
