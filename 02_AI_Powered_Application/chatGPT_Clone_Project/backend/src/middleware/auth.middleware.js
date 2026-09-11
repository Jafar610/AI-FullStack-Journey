import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    //Get token from header.
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bareers ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired",
    });
  }
};
