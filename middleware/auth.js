const jwt = require('jsonwebtoken')

const auth = ( req, res, next ) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if(!token) return res.status(401).json({message: "Access denied. No token provided"})

    try {
        const jwtPrivateKey = process.env.JWT_PRIVATE_KEY
        const decoded = jwt.verify(token, jwtPrivateKey)
        req.user = decoded
        next()
    }  catch(err) {
        return res.status(400).json({ message: 'Invalid token' })
    }
}

module.exports = auth; 