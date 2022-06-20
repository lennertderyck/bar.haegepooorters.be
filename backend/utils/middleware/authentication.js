import jwt from 'jsonwebtoken';
import '../global.js';

const auth = () => {
    return (req, res, next) => {
        try {
            // Set initial user property on request
            req.user = null;
        
            // Check for authorization header
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                next();
                return;
            }
        
            // Check and extract token
            const token = authHeader.split(' ')[1];
            if (!token) {
                next();
                return;
            }
        
            // Decode token
            const decodedToken = jwt.verify(token, process.env.TOKEN_SALT);
            if (!decodedToken) {
                next();
                return;
            }
        
            req.user = decodedToken;
        
            next()
        } catch (error) {
            res.status(500).json({
                status: 'ERROR',
                error
            })
        }
    }
}

export default auth