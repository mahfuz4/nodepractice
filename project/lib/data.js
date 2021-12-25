/*
 * Title: data library
 * Description: This is data library
 * Author: MAHFUZ ANAM
 * Date: 25/8/2021
 *
 */

// dependency
const fs = require('fs');
const path = require('path');

// module scaffolding
const lib = {};

// base directory
lib.baseDir = path.join(__dirname, '../.data/');

// Write data to file
lib.create = (dir, file, data, callback) => {
    // open file for writing
    fs.open(`${lib.baseDir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert data to a string
            const dataString = JSON.stringify(data);
            // write data to file and close it
            fs.writeFile(fileDescriptor, dataString, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Error closing new file!');
                        }
                    });
                } else {
                    callback('Error write new file!');
                }
            });
        } else {
            callback('could not create a new file, it may already exists!');
        }
    });
};

// Read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.baseDir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

// Update extended data
lib.update = (dir, file, data, callback) => {
    // file open for writing
    fs.open(`${lib.baseDir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);
            // truncate the file
            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    // Write to the file and close it.
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            // close the file
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback('Error closing file!');
                                }
                            });
                        } else {
                            callback('Error writing to file!');
                        }
                    });
                } else {
                    callback('Error Truncation the file!');
                }
            });
        } else {
            console.log('Error updating, File may not exist.');
        }
    });
};

// Delete existing data
lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.baseDir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('error deleting file');
        }
    });
};
module.exports = lib;
