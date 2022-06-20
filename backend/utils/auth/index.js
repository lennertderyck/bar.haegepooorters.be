import jwt from 'jsonwebtoken';
import '../global.js';
   
const { TOKEN_SALT } = process.env

export const hashJwtToken = (signData, expiresIn = '24h') => jwt.sign(signData, TOKEN_SALT, { expiresIn });