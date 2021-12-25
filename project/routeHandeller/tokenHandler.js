/*
 * Title: Token Handler
 * Description: This is token handler.
 * Author: MAHFUZ ANAM
 * Date: 28/8/2021
 *
 */

// Dependency
const data = require('../lib/data');
const { parsJSON, hash, createRandomString } = require('../helper/utelities');
const { token } = require('../routes');
const { read } = require('../lib/data');
// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperty, callback) => {
    const acceptMethod = ['get', 'post', 'put', 'delete'];
    if (acceptMethod.indexOf(requestProperty.method) > -1) {
        handler._token[requestProperty.method](requestProperty, callback);
    } else {
        callback(405);
    }
};

handler._token = {};
handler._token.post = (requestProperty, callback) => {
    const phone =
        typeof requestProperty.body.phone === 'string' &&
        requestProperty.body.phone.trim().length === 11
            ? requestProperty.body.phone
            : false;
    const password =
        typeof requestProperty.body.password === 'string' &&
        requestProperty.body.password.trim().length > 0
            ? requestProperty.body.password
            : false;
    if (phone && password) {
        data.read('users', phone, (err, userData) => {
            const hashedPassword = hash(password);
            if (hashedPassword === parsJSON(userData).password) {
                const tokenid = createRandomString(20);
                const expire = Date.now() + 60 * 60 * 1000;
                const tokenObject = {
                    phone,
                    id: tokenid,
                    expire,
                };
                // store the token
                data.create('token', tokenid, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, {
                            error: 'There was an error in server side!',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'password in not veiled!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request!',
        });
    }
};
// @Todo: Authentication
handler._token.get = (requestProperty, callback) => {
    const id =
        typeof requestProperty.quarryStringObject.id === 'string' &&
        requestProperty.quarryStringObject.id.trim().length === 20
            ? requestProperty.quarryStringObject.id
            : false;

    if (id) {
        data.read('token', id, (err, tokenData) => {
            const token1 = { ...parsJSON(tokenData) };
            if (!err && token1) {
                callback(200, token1);
            } else {
                callback(404, {
                    error: 'requested token in not not found!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request token!',
        });
    }
};
// @Todo: Authentication
handler._token.put = (requestProperty, callback) => {
    const id =
        typeof requestProperty.body.id === 'string' && requestProperty.body.id.trim().length === 20
            ? requestProperty.body.id
            : false;
    const extend = !!(
        typeof (requestProperty.body.extend === 'boolean') && requestProperty.body.extend === true
    );

    if (id && extend) {
        data.read('token', id, (err, tokenData) => {
            const tokenObject = parsJSON(tokenData);
            if (tokenObject.expire > Date.now()) {
                tokenObject.expire = Date.now() + 60 * 60 * 1000;
                console.log(tokenObject.expire);
                // Store the updated token
                data.update('token', id, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'token update successfully!',
                        });
                    } else {
                        callback(500, {
                            error: 'There was a server side error!',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'token already expired!',
                });
            }
        });
    } else {
        callback(404, {
            message: 'Data not found!',
        });
    }
};
// @Todo: Authentication
handler._token.delete = (requestProperty, callback) => {
    // check the token if valid
    const id =
        typeof requestProperty.quarryStringObject.id === 'string' &&
        requestProperty.quarryStringObject.id.trim().length === 20
            ? requestProperty.quarryStringObject.id
            : false;
    if (id) {
        data.read('token', id, (err, tokenData) => {
            if (!err && tokenData) {
                data.delete('token', id, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'successfully deleted token!',
                        });
                    } else {
                        callback(400, {
                            error: 'There was server side error!',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'Token cant found! There was a server side error!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'there was an error in data input',
        });
    }
};
//
handler._token.verify = (id, phone, callback) => {
    data.read('token', id, (err, tokenData) => {
        if (!err && tokenData) {
            if (parsJSON(tokenData).phone === phone && parsJSON(tokenData).expire > Date.now()) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
};

module.exports = handler;
