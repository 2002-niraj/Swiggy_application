import { useSelector } from "react-redux";
import Loader from "./Loader";
import { IoIosCheckmarkCircle } from "react-icons/io";

const OrderHistory = () => {
  const { orders, loading } = useSelector((state) => state.orderHistory);

  if (loading) return <Loader />;

  return (
    <div className="pt-24 px-4 h-screen">
      <h1 className="font-bold mt-2 mb-4 text-center text-xl">Past Orders</h1>
      <div>
        {orders?.length === 0 ? (
          <p className="text-center mt-2">No orders found</p>
        ) : (
          <div className="max-w-3xl mx-auto flex flex-col gap-8">
            {orders?.map((order) => (
              <div
                key={order.order_id}
                className=" bg-white p-4 mb-4 rounded border-2 border-gray-200  shadow"
              >

            <div className=" flex justify-between items-start gap-2 pb-4 border-b-2 border-gray-200"> 

                   <div className="flex items-start gap-4">
                  <div className="w-[120px] h-[120px] flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={`https://media-assets.swiggy.com/${order?.restaurant_image}`}
                      alt={order.restaurant_name}
                      className="w-full h-full object-cover object-center cursor-pointer"
                    />
                  </div>

                  <div className="mt-2">
                    <h2 className="text-lg font-semibold ">
                      {order.restaurant_name}
                    </h2>
                    <p className="text-black font-medium mb-1">
                      {order?.restaurant_locality}
                    </p>
                    <p className="text-gray-600 mb-2">
                      Order ID: {order.order_id}
                    </p>
                    <p className="text-orange-500 font-semibold cursor-pointer">VIEW DETAILS</p>
                  </div>
                </div>

                <div className=" mt-2 flex gap-1">
                  <p className="text-gray-600">
                    Delivered on:{" "}
                    {new Date(order.order_date).toLocaleDateString()}
                  </p>
                  <IoIosCheckmarkCircle className="bg-green-700 text-white rounded-xl p-[4px] h-[19px] w-[19px]" />
                </div>
            </div>

            <div className="flex flex-col gap-4" >
                 <div className="flex justify-between items-start mt-4">

                     <ul>
                  {order.orderItems.map((item, index) => (
                    <li key={index} className="text-gray-700 mb-1 font-medium">
                      {item.item_name} x. {item?.quantity} 
                    </li>
                  ))}
                </ul>

                 <p className="text-gray-600">
                  Total Paid: ₹ {order.total_amount}
                </p>
                 </div>

                  <div className="flex items-center gap-6 mt-2 ">
                    <button className="bg-orange-400 cursor-pointer text-white px-6 py-3 font-bold rounded">REORDER</button>
                    <button className="text-orange-500 cursor-pointer px-6 py-[10px] font-bold bg-white border-1 border-gray-400">HELP</button>
                  </div>


            </div>
            
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
