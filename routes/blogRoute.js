const express = require('express');
const multer = require('multer');
const crypto = require("crypto");

const verifySession = require('../utils/sessionVerify')
const blogController = require('../controller/blogController')

const PORT = 8080;
const HOST = '127.0.0.1';
const supportedImageType = ['apng','avif','gif','jpeg','png','svg+xml','webp','jpg']

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        let randomString = crypto.randomBytes(6).toString('hex');
        let uniqueSuffix = randomString + '-' + Math.round(Math.random() * 1E9);
        let array = file.originalname.split('.')
        let fileExtension = array[array.length - 1]
        cb(null, uniqueSuffix + '.' + fileExtension);
    }
});
function fileFilter(req,file,cb){
    let fileType = file.mimetype.split('/')[1]
    if(supportedImageType.includes(fileType)){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

router.post('/upload-image',multer({ storage:storage,fileFilter:fileFilter }).single('image'), (req, res, next) => {
    if(req.file){
        let imageUrl = req.file.path.split("\\")[2]
        let responseData = {
            "success" : 1,
            "file": {
                "url" : `http://${HOST}:${PORT}/images/${imageUrl}`,
            }
        }
        res.json(responseData);
    }else{
        let imageUrl = req.body.url
        if(imageUrl){
            let responseData = {
                "success" : 1,
                "file": {
                    "url" : imageUrl,
                }
            }
            res.json(responseData);
        }else{
            let responseData = {
                "success" : 0,
                "file": {
                    "url" : null,
                }
            }
            res.json(responseData)
        }
    }
});

router.post('/get-editor-raw-data',(req,res,next)=>{

    let dataBlocksArray = req.body.blocks
    let response = blogController.parseData(dataBlocksArray)
    console.log(response)
    res.json({
        success:true,
        msg:response
    })
})

module.exports = router;