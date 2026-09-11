import db from "../../../db/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async ({ name, email, password }) => {
  if (!name?.trim() || !email?.trim() || !password) {
    const error = new Error("All fields are required");
    error.status = 400;
    throw error;
  }

  const existingUser = await db.execute(
    "SELECT * FROM users WHERE email = ? ",
    [email],
  );

  if (existingUser.length > 0) {
    const error = new Error("User already exist");
    error.status = 409;
    throw error;
  }

  // hash the password

  const hashPassword = await bcrypt.hash(password, 10);

  //save
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password) VALUES (?,?,?)",
    [name, email, hashPassword],
  );

  return {
    id: result.insertId,
    name,
    email,
  };
};

export const userLogin = async ({ email, password }) => {
  try {
    if (!email.trim() || !password) {
      const error = new Error("All field are required");
      error.status = 400;
      throw error;
    }

    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      const error = new Error("Invalid Credentials.");
      error.status = 401;
      throw error;
    }

    const user = users[0];
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("Invalid Credentials.");
      error.status = 401;
      throw error;
    }

    //Generate Token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );


    return{
        token,
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
        }
    }
  } catch (error) {
    throw error;
  }
};
