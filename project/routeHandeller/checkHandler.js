/*
 * Title: check handler
 * Description: This is check handler.
 * Author: MAHFUZ ANAM
 * Date: 31/8/2021
 */

// Dependency

const data = require('../lib/data');
const { createRandomString, parsJSON } = require('../helper/utelities');
const tokenHandler = require('./tokenHandler');
const { maxCheck } = require('../helper/environment');
// module scaffolding
const handler = {};

// check handler function
handler.checkHandler = (requestProperty, callback) => {
    const acceptMethod = ['get', 'post', 'put', 'delete'];
    if (acceptMethod.indexOf(requestProperty.method) > -1) {
        handler._check[requestProperty.method](requestProperty, callback);
    } else {
        callback(405);
    }
};
// check handler scaffolding
handler._check = {};

handler._check.post = (requestProperty, callback) => {
    // validate input
    const protocol =
        typeof requestProperty.body.protocol === 'string' &&
        ['http', 'https'].indexOf(requestProperty.body.protocol) > -1
            ? requestProperty.body.protocol
            : false;
    const url =
        typeof requestProperty.body.url === 'string' && requestProperty.body.url.trim().length > 0
            ? requestProperty.body.url
            : false;
    const method =
        typeof requestProperty.body.method === 'string' &&
        ['GET', 'POST', 'PUT', 'DELETE'].indexOf(requestProperty.body.method) > -1
            ? requestProperty.body.method
            : false;

    const successCode =
        typeof requestProperty.body.successCode === 'object' &&
        requestProperty.body.successCode instanceof Array
            ? requestProperty.body.successCode
            : false;
    const timeOutSeconds =
        typeof requestProperty.body.timeOutSeconds === 'number' &&
        requestProperty.body.timeOutSeconds % 1 === 0 &&
        requestProperty.body.timeOutSeconds <= 5
            ? requestProperty.body.timeOutSeconds
            : false;

    if (protocol && url && method && successCode && timeOutSeconds) {
        const token =
            typeof requestProperty.headerObject.token === 'string'
                ? requestProperty.headerObject.token
                : false;

        // lockup the user by reading the token
        data.read('token', token, (err, tokenData) => {
            if (!err && tokenData) {
                const userPhone = parsJSON(tokenData).phone;
                // lockup user data
                data.read('users', userPhone, (err2, userData) => {
                    if (!err2 && userData) {
                        tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
                            if (tokenIsValid) {
                                const userObject = parsJSON(userData);
                                const userChecks =
                                    typeof userObject.checks === 'object' &&
                                    userObject.checks instanceof Array
                                        ? userObject.checks
                                        : [];

                                if (userChecks.length < maxCheck) {
                                    const checkId = createRandomString(20);
                                    const checkObject = {
                                        id: checkId,
                                        userPhone,
                                        protocol,
                                        url,
                                        method,
                                        successCode,
                                        timeOutSeconds,
                                    };
                                    // save the object
                                    data.create('check', checkId, checkObject, (err3) => {
                                        if (!err3) {
                                            // all the check id to the user's object
                                            userObject.checks = userChecks;
                                            userObject.checks.push(checkId);
                                            // save all user data
                                            data.update('users', userPhone, userObject, (err4) => {
                                                if (!err4) {
                                                    // return the data about the new check
                                                    callback(200, checkObject);
                                                } else {
                                                    callback(500, {
                                                        error: 'There was a server side error!',
                                                    });
                                                }
                                            });
                                        } else {
                                            callback(500, {
                                                error: 'There was a server side error!',
                                            });
                                        }
                                    });
                                } else {
                                    callback(404, {
                                        error: 'user has already reached max check limit!',
                                    });
                                }
                            } else {
                                callback(404, {
                                    error: 'serverSide error!',
                                });
                            }
                        });
                    } else {
                        callback(403, {
                            error: 'user not found!',
                        });
                    }
                });
            } else {
                callback(403, {
                    error: 'Authentication error!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request!',
        });
    }
};
handler._check.get = (requestProperty, callback) => {
    const id =
        typeof requestProperty.quarryStringObject.id === 'string' &&
        requestProperty.quarryStringObject.id.trim().length === 20
            ? requestProperty.quarryStringObject.id
            : false;
    if (id) {
        // lookup the check.
        data.read('check', id, (err, checkData) => {
            if (!err && checkData) {
                const token =
                    typeof requestProperty.headerObject.token === 'string'
                        ? requestProperty.headerObject.token
                        : false;
                const { userPhone } = parsJSON(checkData);
                tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
                    if (tokenIsValid) {
                        callback(200, parsJSON(checkData));
                    } else {
                        callback(400, {
                            error: 'Authentication failed!',
                        });
                    }
                });
            } else {
                callback(404, {
                    error: 'there was an error in server side!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'authentication failed!',
        });
    }
};
handler._check.put = (requestProperty, callback) => {
    const id =
        typeof requestProperty.quarryStringObject.id === 'string' &&
        requestProperty.quarryStringObject.id.trim().length === 20
            ? requestProperty.quarryStringObject.id
            : false;
    const protocol =
        typeof requestProperty.body.protocol === 'string' &&
        ['http', 'https'].indexOf(requestProperty.body.protocol) > -1
            ? requestProperty.body.protocol
            : false;
    const url =
        typeof requestProperty.body.url === 'string' && requestProperty.body.url.trim().length > 0
            ? requestProperty.body.url
            : false;
    const method =
        typeof requestProperty.body.method === 'string' &&
        ['GET', 'POST', 'PUT', 'DELETE'].indexOf(requestProperty.body.method) > -1
            ? requestProperty.body.method
            : false;

    const successCode =
        typeof requestProperty.body.successCode === 'object' &&
        requestProperty.body.successCode instanceof Array
            ? requestProperty.body.successCode
            : false;
    const timeOutSeconds =
        typeof requestProperty.body.timeOutSeconds === 'number' &&
        requestProperty.body.timeOutSeconds % 1 === 0 &&
        requestProperty.body.timeOutSeconds <= 5
            ? requestProperty.body.timeOutSeconds
            : false;
    if (protocol || url || method || successCode || timeOutSeconds) {
        data.read('check', id, (err2, checkData) => {
            if ((!err2, checkData)) {
                const checkObject = parsJSON(checkData);
                const token =
                    typeof requestProperty.headerObject.token === 'string'
                        ? requestProperty.headerObject.token
                        : false;
                tokenHandler._token.verify(token, checkObject.userPhone, (tokenIsValid) => {
                    if (tokenIsValid) {
                        if (protocol) {
                            checkObject.protocol = protocol;
                        }
                        if (url) {
                            checkObject.url = url;
                        }
                        if (method) {
                            checkObject.method = method;
                        }
                        if (successCode) {
                            checkObject.successCode = successCode;
                        }
                        if (timeOutSeconds) {
                            checkObject.timeOutSeconds = timeOutSeconds;
                        }
                        data.update('check', id, checkObject, (err4) => {
                            if (!err4) {
                                callback(200, checkObject);
                            } else {
                                callback(500, {
                                    error: 'There was a server side error!',
                                });
                            }
                        });
                    } else {
                        callback(400, {
                            error: 'Authentication failed!',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'There was a server side error!',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request!',
        });
    }
};
handler._check.delete = (requestProperty, callback) => {
    const id =
        typeof requestProperty.quarryStringObject.id === 'string' &&
        requestProperty.quarryStringObject.id.trim().length === 20
            ? requestProperty.quarryStringObject.id
            : false;

    data.read('check', id, (err, checkData) => {
        if (!err && checkData) {
            const token =
                typeof requestProperty.headerObject.token === 'string' &&
                requestProperty.headerObject.token.trim().length === 20
                    ? requestProperty.headerObject.token
                    : false;

            tokenHandler._token.verify(token, parsJSON(checkData).userPhone, (tokenIsValid) => {
                console.log(tokenIsValid);
                if (tokenIsValid) {
                    // delete the check data
                    data.delete('check', id, (err2) => {
                        if (!err2) {
                            data.read('users', parsJSON(checkData).userPhone, (err3, userData) => {
                                const userObject = parsJSON(userData);
                                if (!err3 && userData) {
                                    const userCheck =
                                        typeof userObject.checks === 'object' &&
                                        userObject.checks instanceof Array
                                            ? userObject.checks
                                            : [];
                                    // remove the deleted check id
                                    const checkPosition = userCheck.indexOf(id);
                                    if (checkPosition > -1) {
                                        userCheck.splice(checkPosition, 1);
                                        // reSave the user data
                                        userObject.checks = userCheck;
                                        data.update(
                                            'users',
                                            userObject.phone,
                                            userObject,
                                            (err5) => {
                                                if (!err5) {
                                                    callback(200);
                                                } else {
                                                    callback(400, {
                                                        error: 'There was an error on serverSide!',
                                                    });
                                                }
                                            },
                                        );
                                    } else {
                                        callback(400, {
                                            error: 'There was an error on serverSide!',
                                        });
                                    }
                                } else {
                                    callback(500, {
                                        error: 'There was an error in serverside!',
                                    });
                                }
                            });
                        } else {
                            callback(404, {
                                error: 'There was on error in serverside!',
                            });
                        }
                    });
                }
            });
        } else {
            callback('400', {
                error: 'You have a problem in your request!',
            });
        }
    });
};
// export check handler
module.exports = handler;
