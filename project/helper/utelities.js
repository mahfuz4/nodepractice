/*
 * Title: utilities
 * Description: Important utilities function
 * Author: MAHFUZ ANAM
 * Date:
 *
 */
// Dependencies
const crypto = require('crypto');

const environment = require('./environment');
// module scaffolding
const utilities = {};

// parse json string to object
utilities.parsJSON = (jsonString) => {
    let output = {};

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }
    return output;
};

// hash password
utilities.hash = (string) => {
    if (typeof string === 'string' && string.length > 0) {
        const hash = crypto
            .createHmac('sha256', environment.secretKey)
            .update(string)
            .digest('hex');
        return hash;
    }
    return false;
};

// create random string
utilities.createRandomString = (strLength) => {
    let length = strLength;
    length = typeof strLength === 'number' && strLength > 0 ? strLength : false;
    if (length) {
        const possiblecharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let output = '';
        for (let i = 0; i < length; i += 1) {
            const randomCharacter = possiblecharacters.charAt(
                Math.floor(Math.random() * possiblecharacters.length)
            );
            output += randomCharacter;
        }
        return output;
    }
    return false;
};

// export module
module.exports = utilities;
