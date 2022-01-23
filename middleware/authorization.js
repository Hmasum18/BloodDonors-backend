import jwt from 'jsonwebtoken'

export function authenticateToken(req, res, next){
    const token = req.headers["authorization"]; // token
    if(token == null)
        return res.status(401).json({code: 401, message: "Not authorized."})
    
    // verify token
    jwt.verify(token, process.env.JWT_SECRET, function(error, user){
        if(error)
            return res.status(403).json({error: error.message});
        req.user = user;
        next();
    })
}

// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};