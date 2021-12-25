/*
 * Title: User Handler
 * Description: This is user handler
 * Author: MAHFUZ ANAM
 * Date: 25/8/2021
 */

// dependency
const data = require('../lib/data');
const { hash, parsJSON } = require('../helper/utelities');
const { user } = require('../routes');
const tokenHandler = require('./tokenHandler');
// module scaffolding
const handler = {};

// user Handler
handler.userHandler = (requestProperty, callback) => {
    const acceptMethod = ['get', 'post', 'put', 'delete'];
    if (acceptMethod.indexOf(requestProperty.method) > -1) {
        handler._users[requestProperty.method](requestProperty, callback);
    } else {
        callback(405);
    }
};
handler._users = {};
handler._users.post = (requestProperty, callback) => {
    const firstName =
        typeof requestProperty.body.firstName === 'string' &&
        requestProperty.body.firstName.trim().length > 0
            ? requestProperty.body.firstName
            : false;
    const lastName =
        typeof requestProperty.body.lastName === 'string' &&
        requestProperty.body.lastName.trim().length > 0
            ? requestProperty.body.lastName
            : false;
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
    const tosAgreement =
        typeof requestProperty.body.tosAgreement === 'boolean'
            ? requestProperty.body.tosAgreement
            : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure this user already doesn't exist
        data.read('users', phone, (err, usr) => {
            if (err) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };
                // store the user to database
                data.create('users', phone, userObject, (err5) => {
                    if (!err5) {
                        callback(200, {
                            message: 'user was created successfully.',
                        });
                    } else {
                        callback(500, {
                            error: 'could not create user!',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'There is an error in server side!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request!',
        });
    }
};
handler._users.get = (requestProperty, callback) => {
    const phone =
        typeof requestProperty.quarryStringObject.phone === 'string' &&
        requestProperty.quarryStringObject.phone.trim().length === 11
            ? requestProperty.quarryStringObject.phone
            : false;

    if (phone) {
        // verify with token
        const token =
            typeof requestProperty.headerObject.token === 'string'
                ? requestProperty.headerObject.token
                : false;
        tokenHandler._token.verify(token, phone, (tokenId) => {
            if (tokenId) {
                data.read('users', phone, (err, u) => {
                    const users = { ...parsJSON(u) };
                    if (!err && users) {
                        delete users.password;
                        callback(200, users);
                    } else {
                        callback(404, {
                            error: 'Required user is not found!',
                        });
                    }
                });
            } else {
                callback(404, {
                    error: 'Authentication failed!',
                });
            }
        });
        // lookup the user
    } else {
        callback(404, {
            error: 'Required user is not found!',
        });
    }
};
// @Todo: Authentication
handler._users.put = (requestProperty, callback) => {
    const firstName =
        typeof requestProperty.body.firstName === 'string' &&
        requestProperty.body.firstName.trim().length > 0
            ? requestProperty.body.firstName
            : false;
    const lastName =
        typeof requestProperty.body.lastName === 'string' &&
        requestProperty.body.lastName.trim().length > 0
            ? requestProperty.body.lastName
            : false;
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

    if (phone) {
        // verify token
        if (firstName || lastName || password) {
            const token =
                typeof requestProperty.headerObject.token === 'string'
                    ? requestProperty.headerObject.token
                    : false;
            tokenHandler._token.verify(token, phone, (tokenId) => {
                if (tokenId) {
                    data.read('users', phone, (err, uData) => {
                        const userData = { ...parsJSON(uData) };
                        if (!err && userData) {
                            if (firstName) {
                                userData.firstName = firstName;
                            }
                            if (lastName) {
                                userData.lastName = lastName;
                            }
                            if (password) {
                                userData.password = hash(password);
                            }
                            // store to database
                            data.update('users', phone, userData, (err2) => {
                                if (!err2) {
                                    callback(200, {
                                        message: 'user was update successfully.',
                                    });
                                } else {
                                    callback(500, {
                                        error: 'There was a problem!',
                                    });
                                }
                            });
                        } else {
                            callback(400, {
                                error: 'You have a problem',
                            });
                        }
                    });
                } else {
                    callback(404, {
                        error: 'Authentication failed!',
                    });
                }
            });

            // find input phone number
        } else {
            callback(400, {
                error: 'You have a problem in your request!',
            });
        }
    } else {
        callback(400, {
            error: 'Invalid phone number, Please try again!',
        });
    }
};
// @Todo: Authentication
handler._users.delete = (requestProperty, callback) => {
    const phone =
        typeof requestProperty.quarryStringObject.phone === 'string' &&
        requestProperty.quarryStringObject.phone.trim().length === 11
            ? requestProperty.quarryStringObject.phone
            : false;

    if (phone) {
        // verify token
        const token =
            typeof requestProperty.headerObject.token === 'string'
                ? requestProperty.headerObject.token
                : false;
        tokenHandler._token.verify(token, phone, (tokenId) => {
            if (tokenId) {
                data.read('users', phone, (err, userData) => {
                    if (!err && userData) {
                        data.delete('users', phone, (err2) => {
                            if (!err2) {
                                callback(200, {
                                    message: 'user was deleted successfully!',
                                });
                            } else {
                                callback(500, {
                                    error: 'There was an error in server side!',
                                });
                            }
                        });
                    } else {
                        callback(500, {
                            error: 'There is a problem in your request1!',
                        });
                    }
                });
            } else {
                callback(404, {
                    error: 'Authentication failed!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'There was a problem in your request!',
        });
    }
};
module.exports = handler;
