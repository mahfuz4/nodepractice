/*
 * Title: environment variable
 * Description: This is environment variable.
 * Author: MAHFUZ ANAM
 * Date: 25/8/2021
 */

// Dependency

// module scaffolding
const environment = {};
environment.staging = {
    port: 3002,
    envName: 'staging',
    secretKey: 'rrgdgedgrwwrlflsrrwrw',
    maxCheck: 50,
};
environment.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'rrgdgedgrwtrlflsrrwrw',
    maxCheck: 5,
};
// determine which environment was passed
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';
// export corresponding environment object
const environmentToExport =
    typeof environment[currentEnvironment] === 'object'
        ? environment[currentEnvironment]
        : environment.staging;

module.exports = environmentToExport;
