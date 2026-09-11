import db from '../../../db/db.config.js'
import bcrypt from 'bcrypt'
export const registerUser = async({name, email, password})=>{
    if(!name || !email || !password){
        throw new Error('All Fields are required');
    }

    const [existingUser] = db.execute(
        'SELECT * FROM users WHERE email = ? ', [email]
    );

    if(existingUser.length > 0){
        throw new Error('User already exist');
    }

    // hash the password

    const hashPassword = await bcrypt.hash(password, 10);

    //save
    const [user] = await db.execute(
        'INSERT INTO users (name, email, password) VALUES (?,?,?)',[name, email, hashPassword]
    );

    return user;
}  