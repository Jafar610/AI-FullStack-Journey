import {safeExecute} from '../../../../db/config.js'

const normalizeEmail = email => email.trim().toLowercase();

const checkUserExists = async email =>{
   const  normalizedEmail = normalizeEmail(email);
   const sql = 'SELECT * user_id FROM users WHERE email = ? limit 1';
   const rows = await safeExecute(sql, normalizedEmail);
   return rows.length > 0;
}

const registerService = async({
    firstName, lastName, email, password
})=>{
    const normalizedEmail = normalizeEmail(email);
    const userExists = await checkUserExists(normalizedEmail);

    if(userExists){
        throw new BadRequestError('User already exist with this email.');
    }
}