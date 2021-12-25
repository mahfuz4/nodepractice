/*
 * Title: sample handler
 * Description: This is sample handler
 * Author: MAHFUZ ANAM
 * Date: 23/8/2021
 *
 */
// module scaffolding
const handler = {};
// sample handler
handler.sampleHandler = (requestProperty, callBack) => {
    console.log(requestProperty);

    callBack(200, { message: 'This is a sample url' });
};

// export module handler
module.exports = handler;
