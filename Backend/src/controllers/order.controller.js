import { storeRestaurantDetails,createOrderModel, insertOrderItems } from "../models/order.model.js";
const createOrder = async (req, res) => {

 try{

       const { userId,  restaurantInfo , total, address, items } = req.body;
       

      const restoId = await storeRestaurantDetails(restaurantInfo);

      const orderId  = await createOrderModel(userId, restoId, total, address);

       for (const item of items){
            await insertOrderItems(orderId,item);
       }

       res.status(201).json({ success: true, message: "Order placed", orderId });
 }
 catch(error){
    //console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
 }
}

export { createOrder };