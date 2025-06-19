import { storeRestaurantDetails,createOrderModel, insertOrderItems } from "../models/order.model.js";
import {HTTP_STATUS} from "../constants/httpStatus.js"
import { MESSAGES } from "../constants/messages.js";

const { CREATED, BAD_REQUEST} = HTTP_STATUS;
const { ORDER_SUCCESS, MISSING_FIELDS } = MESSAGES;


const createOrder = async (req, res,next) => {

 try{

       const { userId,  restaurantInfo , total, address, items } = req.body;
            if (!userId || !restaurantInfo || !total || !address || !items || items.length === 0) {
            return res.status(BAD_REQUEST).json({ status:BAD_REQUEST, success: false, message: MISSING_FIELDS });
            }
       
      const restoId = await storeRestaurantDetails(restaurantInfo);

      const orderId  = await createOrderModel(userId, restoId, total, address);

       for (const item of items){
            await insertOrderItems(orderId,item);
       }

       res.status(CREATED).json({ status:CREATED, success: true, message: ORDER_SUCCESS , orderId });
 }
 catch(error){
 next(error)
 }
}

export { createOrder };