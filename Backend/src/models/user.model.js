import { sql, connectToDb } from "../config/dbConnection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const createUser = async (name, email, password, phone, address) => {
  try {
    const pool = await connectToDb();
    const query = `
        INSERT INTO dbo.users (name, email, password, phone)
        OUTPUT inserted.id, inserted.name, inserted.email
        VALUES (@name, @email, @password, @phone)`;

    const result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .input("phone", sql.VarChar, phone)
      .query(query);
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return {
        status: 404,
        message: "User Not Found",
        success: false,
      };
    }
    const ispassowrdValid = await bcrypt.compare(password, user.password);
    if (!ispassowrdValid) {
      return { message: "Invaild Password", status: 401, success: false };
    }
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      message: "Login Success",
      status: 200,
      success: true,
      token,
    };
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const pool = await connectToDb();
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query(`SELECT * FROM users WHERE email = @email AND is_deleted = 0`);

    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

export { createUser, findUserByEmail, login };
