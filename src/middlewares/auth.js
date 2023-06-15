const User = require("../api/models/users.model");
const { verifySign } = require("../utils/jwt");


const pruebaMiddleware = (req, res, next) => {
    console.log("paso por el middleware");
    next(); //Funcion next da paso a lo siguiente
}

// Middleware function to check if the user is authenticated
const isAuth = async (req, res, next) => {
    try {
        // Get the authorization header from the request
        const authorization = req.headers.authorization;
        console.log("authorization token --------", authorization);

        // Check if the authorization header is missing
        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Extract the token from the authorization header
        // Authorization header format: "Bearer <token>"
        const token = authorization.split(" ")[1];

        // Check if the token is missing
        if (!token) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Verify the authenticity of the token
        const tokenVerified = verifySign(token);

        // Check if the token is invalid or expired
        if (!tokenVerified.id) {
            return res.status(401).json(tokenVerified);
        }

        // Find the user associated with the token
        const userLogged = await User.findById(tokenVerified.id);

        // Attach the user object to the request for further use
        req.user = userLogged;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Handle any errors that occur during authentication
        return res.status(500).json(error);
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization; //cojo la authorization

        if(!authorization){
            return res.status(401).json({message: "Unauthorized"});
        }
        
        //Mi authorization es Bearer XXXX -> hago un split para quedarme con XXX
        const token = authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({message: "Invalid token"});
        }

        const tokenVerified = verifySign(token);
        console.log(tokenVerified)
        if(!tokenVerified.id){
            return res.status(401).json(tokenVerified);
        }

        const userLogged = await User.findById(tokenVerified.id);
        req.user = userLogged;


        if(userLogged.role !== 'admin') {
            return res.status(401).json({message: "Necesitas ser administrador"});
        }
        next()
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {pruebaMiddleware, isAuth, isAdmin}