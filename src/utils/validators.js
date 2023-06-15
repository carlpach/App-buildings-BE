const User = require("../api/models/users.model");

const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    return regex.test(String(password));
}

const usedEmail = async(email) => {
    const users = await User.find({ email: email });
    console.log(users.length);
    return users.length;
}

const usedUserName = async(userName) => {
    const users = await User.find({ userName: userName });
    console.log(users.length);
    return users.length;
}

module.exports = { validatePassword, validateEmail, usedEmail, usedUserName }