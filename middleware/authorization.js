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