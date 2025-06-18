import { sql, connectToDb } from "../config/db.js";


const storeRestaurantDetails = async(restaurantInfo)=>{

    try{
           const pool = await connectToDb();
           const {name,locality, cloudinaryImageId} = restaurantInfo;
           const query = `INSERT INTO restaurants (name, locality,  cloudinaryImageId)
      OUTPUT inserted.id
      VALUES (@name, @locality, @cloudinaryImageId)`;
      const result = await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("locality", sql.VarChar, locality)
        .input("cloudinaryImageId", sql.VarChar, cloudinaryImageId)
        .query(query);

        return result.recordset[0].id;
    }
    catch(error){
        //console.error("Error storing restaurant details:", error);
        throw new Error("Internal server error");
    }
}
const createOrderModel = async(userId, restoId, total, address)=>{

    try{
         const pool = await connectToDb();
     const query = `INSERT INTO orders (user_id, restaurant_id, total_amount, address, status)
      OUTPUT inserted.id
      VALUES (@userId, @restoId, @total, @address, 'Placed')`;

        const result = await pool
        .request()
        .input("userId", sql.Int, userId)
        .input("restoId", sql.Int, restoId)
        .input("total", sql.Decimal(10, 2), total/100)
        .input("address", sql.VarChar, address)
        .query(query);
        return result.recordset[0].id;
    }
    catch(error){
        //console.error("Error creating order:", error);
        throw new Error("Internal server error");
    }
   
}

const insertOrderItems = async(orderId, item) => {

  try{

    const pool = await connectToDb();

    const query = `INSERT INTO order_items (order_id, item_name, quantity, price_per_unit, is_veg)
    VALUES (@orderId, @itemName, @quantity, @price, @isVeg)`;

    await pool
    .request()
    .input("orderId", orderId)
    .input("itemName", item?.name)
    .input("quantity", item?.quantity)
    .input("price", (item?.price/100 || item?.defaultPrice))
    .input("isVeg", item?.isVeg)
    .query(query);  
  }
  catch(error){
    //console.error("Error inserting order items:", error);
    throw new Error("Internal server error");
  }
}

export {storeRestaurantDetails , createOrderModel, insertOrderItems}