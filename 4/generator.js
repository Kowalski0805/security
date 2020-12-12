const fs = require('fs');

const t100 = fs.readFileSync('top100.txt', 'ascii').split('\n');
const t1kk = fs.readFileSync('top1kk.txt', 'ascii').split('\n');

const az09 = [].concat(
    [...Array(26).keys()].map(e => String.fromCharCode(e + 65)),
    [...Array(26).keys()].map(e => String.fromCharCode(e + 97)),
    [...Array(10).keys()]
);

const l33t = {
    o: '0',
    i: '1',
    e: '3',
    a: '@',
    s: 'z',
    t: '7',
};

const rand = (min, max) => min + Math.floor(Math.random() * max);
const randarr = (arr) => arr[rand(0, arr.length)];

const between = (n, min, max) => min <= n && n < max;
const probably = p => Math.random() < p;

const top100 = () => t100[rand(0, 100)];
const top1kk = () => t1kk[rand(0, 1000000)];

const reallyRandom = () => Array(rand(8, 12)).fill(0).map(() => randarr(az09)).join('');

const leet = str => str.split('').map(e => probably(0.7) && l33t[e] ? l33t[e] : e).join('');
const nums = str => str + rand(0, 10000);

const transform = () => (e = top1kk(), probably(0.8) ? e = leet(e) : null, probably(0.4) ? nums(e) : e);

const generate = () => {
    const x = rand(0, 100);
    
    if (between(x, 0, 5)) {
        return reallyRandom();
    }

    if (between(x, 5, 15)) {
        return top100();
    }

    if (between(x, 15, 35)) {
        return transform();
    }

    return top1kk();
}

fs.writeFileSync('passwords.txt', Array.from({length: 100000}, () => generate()).join('\n'));