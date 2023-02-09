const Validators = {};

Validators.isValidUserName = (userName) => {
    let userNameValidationRegex = /^[a-zA-Z0-9]+$/;
    if (!userNameValidationRegex.test(userName)) {
        let error = new Error("Invalid username. Only letter and number are accepted.");
        error.status = 400;
        throw error;
    }
};

Validators.isValidEmail = (email) => {
    let emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidationRegex.test(email)) {
        let error = new Error("Invalid email id");
        error.status = 400;
        throw error;
    }
};

Validators.isValidPassword = (password) => {
    let passwordValidationRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (!passwordValidationRegex.test(password)) {
        let error = new Error("Password is too weak");
        error.status = 400;
        throw error;
    }
};

module.exports = Validators;