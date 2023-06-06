const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        if(!token)
        {
            res.status(401);
            throw new Error("Usr is not authorize or tojkone missing")
        }
        jwt.verify(token, process.env.ACCESS_TOCKEN_SECRATE, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error('Invalid user authentication');
            }
            req.user = decoded.user;
            next();
        })
    }
});

module.exports = validateToken;