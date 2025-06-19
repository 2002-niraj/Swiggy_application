import jwt from "jsonwebtoken";
import {HTTP_STATUS} from "../constants/httpStatus.js"
import { MESSAGES } from "../constants/messages.js";

const { UNAUTHORIZED, FORBIDDEN } = HTTP_STATUS;
const { ACCESS_DENIED, INVALID_TOKEN } = MESSAGES;

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    
    if (!token) {
        return res.status(UNAUTHORIZED).json({ Status: UNAUTHORIZED, success: false, message: ACCESS_DENIED });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
        return res.status(FORBIDDEN).json({ status:FORBIDDEN, success: false, message: INVALID_TOKEN });
        }
        req.user = user;
        next();
    });
    }

    export { authenticateToken };