import { StatusCodes } from "http-status-codes";
import { registerService } from "../service/auth.service.js";
export const registerController = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser = await registerService({
      firstName,
      lastName,
      email,
      password,
    });

    res.Status(
      StatusCodes.CREATED.json({
        success: true,
        message: "user registered successfully.",
        user: newUser,
      }),
    );
  } catch (error) {
    next(error);
  }
};


const loginController = async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        const authResult = await loginService({email, password});
        res.status(StatusCodes.OK).json({
            success:true,
            message:'Login Successful',
            user:authResult.user,
            token:authResult.token,
        })
    } catch (error) {
        next(error);
    }
}