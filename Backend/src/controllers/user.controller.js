import bcrypt from "bcryptjs";
import { createUser, findUserByEmail ,login } from "../models/user.model.js";
import {HTTP_STATUS} from "../constants/httpStatus.js"
import { MESSAGES } from "../constants/messages.js";

const { CREATED, CONFLICT, BAD_REQUEST} = HTTP_STATUS;

const { USER_ALREADY_EXISTS, USER_REGISTERED_SUCCESSFULLY, ALL_FIELDS_REQUIRED } = MESSAGES;

const registerUser = async (req, res,next) => {
  try {
    const { name, email, password, phone } = req.body;


    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res
        .status(CONFLICT)
        .json({
          status:CONFLICT,  
          success:false,
          user: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
          },
          message: USER_ALREADY_EXISTS
        });
    }

    if (!name || !email || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ status:BAD_REQUEST, success:false,message: ALL_FIELDS_REQUIRED });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userDetails = await createUser(
      name,
      email,
      hashedPassword,
      phone
    );

    res.status(CREATED).json({
        status:CREATED,
        success:true,
      message: USER_REGISTERED_SUCCESSFULLY,
      user: {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res,next) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
            return res.status(BAD_REQUEST).json({ status:BAD_REQUEST,message: ALL_FIELDS_REQUIRED, success:false });
     }

     const response = await login(email,password);
      if(!response.success){
            return res.status(response.status).json( {status:response.status, success: response.success, message:response.message})
      }

    res.status(response.status).json({status:response.status,success:response.success,message:response.message,token:response?.token});
   

    
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
