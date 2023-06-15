const jwt = require('jsonwebtoken');

const generateSign = (id, email) => {
    console.log("jwt -------", id, email);
    console.log(process.env.JWT_KEY);
    return jwt.sign(
        //Este es el payload, aqui se inserta la información que 
        //queremos que contenga nuestro token.
        {id, email}, 
        //en este punto como segundo parametro se configura si se utiliza clave privada o publica
        process.env.JWT_KEY, 
        {expiresIn: '4h'})
}


const verifySign = (token) => {
    return jwt.verify(token, process.env.JWT_KEY)
}

module.exports = {generateSign, verifySign};