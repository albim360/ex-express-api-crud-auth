const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('Authorization');
    
    if (!token) return res.status(401).json({ message: 'Token mancante' });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token non valido' });
        
        req.user = decoded;

        next();
    });
}

module.exports = auth;
