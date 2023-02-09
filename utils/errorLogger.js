const fs = require('fs');
const path = require('node:path');
let errorLogger = function (err, req, res, next) {
    if (err) {
        let filePath = path.join(__dirname, '../logs/');
        fs.appendFile(filePath + 'errorLogger.log', new Date() + " : " + err.stack + "\n", (error) => {
            if (error) {
                console.log("logging error failed");
            }
        });
        if (err.status) {
            res.status(err.status);
        }
        else {
            res.status(500);
        }
        res.json({ "message": err.message });
    }
    next();
};

module.exports = errorLogger;
