'use strict';

const fs = require('fs');
const crypto = require('crypto');
const sha1 = require('sha1');
const bcrypt = require('bcrypt');
const md5 = require('md5');

const passwordsSet = fs.readFileSync('passwords.txt', 'ascii').split('\n');

const getSalt = () => crypto.randomBytes(16).toString('hex');

const getSha = password => {
    const salt = getSalt();
    return sha1(password + salt) + '.' + salt;
};

const getBcrypt = password => bcrypt.hash(password, 5);

const getMd5 = (password) => md5(password);

fs.writeFileSync('md5.txt', passwordsSet.map(e => getMd5(e)).join('\n'));
fs.writeFileSync('sha.txt', passwordsSet.map(e => getSha(e)).join('\n'));

Promise.all(passwordsSet.map(e => getBcrypt(e))).then(result => {
    fs.writeFileSync('bcr.txt', result.join('\n'));
});