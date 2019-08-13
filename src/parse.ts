const MILLISECOND = 1;
const SECOND = MILLISECOND * 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;

const units = {
    second: SECOND,
    s: SECOND,
    minute: MINUTE,
    m: MINUTE,
    hour: HOUR,
    h: HOUR,
    day: DAY,
    d: DAY,
    week: WEEK,
    wk: WEEK,
    w: WEEK,
    month: MONTH,
    year: YEAR,
    y: YEAR,
    yr: YEAR
};

const MESSAGE_REGEX = /(\d+(?:\.\d+)?)\s*([a-zA-Z]+)?\s+(.+)/;

function getMilliseconds(amount: string, unit: string) {
    if (unit.endsWith('s') && unit.length > 1) unit = unit.substr(0, unit.length - 1);
    if (!units[unit]) throw new Error(`Invalid unit`);
    return parseFloat(amount) * units[unit];
}

export function parseMessage(message: string) {
    message = message.trim();
    message = message.replace(/\s+/g, ' ');
    const match = MESSAGE_REGEX.exec(message);

    if (!match) return null;

    try {
        let [_, amount, unit, rest] = match;
        let milliseconds = getMilliseconds(amount, unit);
        let date = new Date(Date.now() + milliseconds);

        if (isInvalidDate(date)) {
            return null;
        }

        return {
            date,
            message: rest.trim()
        };
    } catch (err) {
        return null;
    }
}

function isInvalidDate(date: Date) {
    return isNaN(date.getTime());
}
