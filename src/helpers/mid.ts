
export async function getNextMID(): Promise<string> {
    const numberOfDigits = 4;
    const channel = '9';

    const t = Date.now();
    const micro = Math.floor((t % 1000) * 1000);
    const d = new Date(t);
    const time = Math.floor(d.getTime() / 1000);

    const rand = Math.floor(Math.random() * (Math.pow(10, numberOfDigits))) + Math.pow(10, numberOfDigits - 1);

    let mctime = micro.toString().slice(0, 4);
    if (mctime.length !== 4) {
        mctime = mctime.padStart(4, '0');
    }

    const result = `${time}${mctime}${rand}${channel}`;
    return result.length !== 19 ? `${time}${rand}${channel}` : result;
}