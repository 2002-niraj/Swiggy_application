import {fetchOrdersWithItems } from "../models/userOrders.model.js";
import {HTTP_STATUS} from "../constants/httpStatus.js"
import { MESSAGES } from "../constants/messages.js";

const { OK, BAD_REQUEST } = HTTP_STATUS;
const { ORDER_FETCHED, USER_ID_MISSING} = MESSAGES


const getUserOrders = async(req , res,next)=>{

    try{
        const userId = parseInt( req.params.userId,10);
        if(!userId){
            return res.status(BAD_REQUEST).json({ status:BAD_REQUEST, success: false, message: USER_ID_MISSING });
        }

    const orderDetails = await fetchOrdersWithItems(userId);

        res.status(OK).json({
            status: OK,
            success: true,
            message: ORDER_FETCHED,
            data: {
             orderDetails
            }
        });

    }
    catch(error){
        next(error);
    }
}

export { getUserOrders };