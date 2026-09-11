import db from "../../../db/db.config.js";
import bcrypt from "bcrypt";

export const registerUser = async ({ name, email, password }) => {
  if(!name?.trim() || !email?.trim() || !password) { 
   const error = new Error("All fields are required");
    error.status = 400;
    throw error;
}

  const existingUser = await db.execute("SELECT * FROM users WHERE email = ? ", [
    email,
  ]);


  if (existingUser.length > 0) {
    const error =  new Error("User already exist");
    error.status = 409;
    throw error
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
