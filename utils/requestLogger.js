const fs = require('fs');
const path = require('node:path');
const RequestLogger = (req, res, next) => {
    console.log("Request method is ", req.method);
    console.log("Request url is ", req.url);
    let logMessage = `${new Date().toDateString()} - ${req.method} : ${req.url} \n`;
    let filePath = path.join(__dirname, '../logs/');
    fs.appendFile(filePath + 'requestLogger.log', logMessage, (err) => {
        if (err)
            return next(err);
    });
    next();
};
module.exports = RequestLogger;