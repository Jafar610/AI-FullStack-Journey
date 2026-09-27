import { StatusCodes } from "http-status-codes";

const registerController = async (req, res, next) => {
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
