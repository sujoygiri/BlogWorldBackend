const bcrypt = require('bcryptjs')

let userModel = require('../database/model/userModel');
let Validators = require('../utils/validate');

let userController = {};

userController.registrationHandler = async (req, res, next) => {
    let userName = req.body.userName;
    let email = req.body.email;
    let password = req.body.password;
    if (userName && email && password) {
        try {
            Validators.isValidUserName(userName);
            Validators.isValidEmail(email);
            Validators.isValidPassword(password);
            let salt = bcrypt.genSaltSync(10)
            let hashedPassword = bcrypt.hashSync(password, salt)
            let userData = {
                userName,
                email,
                password: hashedPassword
            }
            let userDetails = await userModel.create(userData)
            if (userDetails) {
                let userId = userDetails._id.toString()
                console.log(userId)
                req.session.regenerate((err) => {
                    if (err) next(err)
                    req.session.userId = userId
                    req.session.save((err) => {
                        if (err) return next(err)
                        res.json({
                            success: true,
                            message: "Registration successful",
                            userName: userDetails.userName
                        })
                    })
                })
            } else {
                let error = new Error("Registration failed due to server error.")
                error.status = 400
                next(error)
            }

        } catch (error) {
            next(error)
        }
    } else {
        let error = new Error('All fields are required')
        error.status = 404
        next(error)
    }
};

userController.loginHandler = async (req, res, next) => {
    let email = req.body.email
    let password = req.body.password
    if (email && password) {
        try {
            Validators.isValidEmail(email)
            Validators.isValidPassword(password)
            let userDetails = await userModel.findOne({email})
            if(userDetails){
                let hashedPassword = userDetails.password
                let isPasswordMatch = bcrypt.compareSync(password,hashedPassword)
                if(isPasswordMatch){
                    let userId = userDetails._id.toString()
                    req.session.regenerate((err)=>{
                        if(err) next(err)
                        req.session.userId = userId
                        req.session.save((err)=>{
                            if(err) return next(err)
                            res.json({
                                success:true,
                                message:"Login successful",
                                userName: userDetails.userName
                            })
                        })
                    })
                }else{
                    let error = new Error("Password did not match. Try again.")
                    error.status = 404
                    next(error)
                }
            }else{
                let error = new Error("User not found. You need to register first.")
                error.status = 404
                next(error)
            }
        } catch (error) {
            next(error)
        }
    } else {
        let error = new Error("All fields are required")
        error.status = 404
        next(error)
    }
};


module.exports = userController;