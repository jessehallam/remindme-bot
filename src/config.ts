import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

interface Config {
    bot: {
        command_prefix: string;
        login_token: string;
    };
    data: {
        connection_uri: string;
    };
}

const configFileName = path.resolve('./config.yml');
const configText = fs.readFileSync(configFileName).toString();

export const config: Config = yaml.safeLoad(configText);
