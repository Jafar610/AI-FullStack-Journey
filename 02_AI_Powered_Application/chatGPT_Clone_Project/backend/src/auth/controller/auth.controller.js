import { registerUser } from "../service/auth.service";
export const register = async(req, res) =>{
    try {
        const user = await registerUser(req.body) ;
        res.status(201).json({
            success: true,
            message : 'User Registered successfully',
            data:user,
        });
    } catch (error) {
        throw error;
    }
}