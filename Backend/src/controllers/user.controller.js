import bcrypt from "bcryptjs";
import { createUser, findUserByEmail ,login } from "../models/user.model.js";
const getAllUsers = async (req, res) => {
  try {
  } catch (error) {}
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;


    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res
        .status(409)
        .json({
          status:409,  
          success:false,
          user: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
          },
          message: "User Already Exists",
        });
    }

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status:400, success:false,message: "All required fields must be filled" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userDetails = await createUser(
      name,
      email,
      hashedPassword,
      phone
    );

    res.status(201).json({
        status:201,
        success:true,
      message: "User Registered Successfully",
      user: {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
            return res.status(400).json({ status:400,message:"Email and password are required"});
     }

     const response = await login(email,password);
      if(!response.success){
            return res.status(response.status).json( {status:response.status, success: response.success, message:response.message})
      }

    res.status(response.status).json({status:response.status,success:response.success,message:response.message,token:response?.token});
   

    
  } catch (error) {
    console.log(error);
  }
};

export { getAllUsers, registerUser, loginUser };
