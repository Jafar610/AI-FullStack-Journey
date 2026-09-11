import { registerUser, userLogin } from "../service/auth.service.js";
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    throw error;
  }
};


export const login = async(req, res) =>{
    try {
        const result = await userLogin(req.body)
        res.status(201).json({
            success: true,
            message: 'User logged in successfully',
            data: result,
        })
    } catch (error) {
        throw error
    }
}
