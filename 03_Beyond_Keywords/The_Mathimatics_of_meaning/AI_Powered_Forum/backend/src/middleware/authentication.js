import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from '../utils/errors';

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET){
    throw new Error('JWT enviroment variable is required');
}
export const authenticateUser = async(req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startWith('Baerer')){
        throw new UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = {
            id:payload.id,
            firstName: payload.firstName,
            lastName : payload.lastName,
        };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
}