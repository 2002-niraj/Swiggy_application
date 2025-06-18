import {fetchOrdersWithItems } from "../models/userOrders.model.js";
const getUserOrders = async(req , res)=>{


    try{
        const userId = parseInt( req.params.userId,10);
        if(!userId){
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

    const orderDetails = await fetchOrdersWithItems(userId);

        res.status(200).json({
            success: true,
            message: "User orders fetched successfully",
            data: {
             orderDetails
            }
        });

    }
    catch(error){
       // console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export { getUserOrders };