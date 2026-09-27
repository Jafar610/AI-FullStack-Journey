import { safeExecute } from "../../../../db/config.js";
import bcrypt from "bcrypt";
const normalizeEmail = (email) => email.trim().toLowercase();

const checkUserExists = async (email) => {
  const normalizedEmail = normalizeEmail(email);
  const sql = "SELECT * user_id FROM users WHERE email = ? limit 1";
  const rows = await safeExecute(sql, normalizedEmail);
  return rows.length > 0;
};

export const registerService = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  const normalizedEmail = normalizeEmail(email);
  const userExists = await checkUserExists(normalizedEmail);

  if (userExists) {
    throw new BadRequestError("User already exist with this email.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const sql =
    "INSERT INTO users (first_name, last_name, email, hash_password) VALUES (?,?,?,?)";
  let result;
  try {
    result = await safeExecute(sql, [
      firstName,
      lastName,
      normalizedEmail,
      hashedPassword,
    ]);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new BadRequestError("User already exist with this email.");
    }
    throw error;
  }

  return {
    id: result.insertId,
    firstName,
    lastName,
    email: normalizedEmail,
  };
};
