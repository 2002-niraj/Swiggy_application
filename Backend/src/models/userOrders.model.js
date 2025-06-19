// models/orderCombinedModel.js
import { connectToDb, sql } from "../config/dbConnection.js";

export const fetchRestaurantOrders = async (user_id) => {
  const pool = await connectToDb();
  const query = `
    SELECT
      o.id                   AS order_id,
      r.name                 AS restaurant_name,
      r.locality             AS restaurant_locality,
      r.cloudinaryImageId    AS restaurant_image,
      o.total_amount,
      o.created_at           AS order_date
    FROM dbo.restaurants r
    JOIN dbo.orders o ON r.id = o.restaurant_id
    WHERE o.user_id = @UserId
    ORDER BY o.created_at DESC;
  `;
  const result = await pool
    .request()
    .input("UserId", sql.Int, user_id)
    .query(query);
  return result.recordset;
};

export const fetchOrderItems = async (user_id) => {
  const pool = await connectToDb();
  const query = `
    SELECT
      o.id                 AS order_id,
      oi.item_name,
      oi.is_veg            AS isVeg,
      oi.quantity,
      oi.price_per_unit    AS pricePerUnit
    FROM dbo.orders o
    JOIN dbo.order_items oi ON o.id = oi.order_id
    WHERE o.user_id = @UserId
    ORDER BY o.created_at DESC, oi.id;
  `;
  const result = await pool
    .request()
    .input("UserId", sql.Int, user_id)
    .query(query);
  return result.recordset;
};


export const fetchOrdersWithItems = async (user_id) => {
  // 1) fetch both lists in parallel
  const [orders, items] = await Promise.all([
    fetchRestaurantOrders(user_id),
    fetchOrderItems(user_id),
  ]);

  // 2) group items by order_id
  const itemsByOrder = items.reduce((acc, itm) => {
    if (!acc[itm.order_id]) acc[itm.order_id] = [];
    acc[itm.order_id].push(itm);
    return acc;
  }, {});

  // 3) attach to each order
  return orders.map((o) => ({
    ...o,
    orderItems: itemsByOrder[o.order_id] || [],
  }));
  
};
