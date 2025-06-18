import { FaLocationDot } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import getRestoById from "../utils/getRestoById";
import { IoMdRemove } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { decreaseItem, additems } from "../features/cart/cartSlice";
import Loader from "./Loader";
import placeOrders from "../features/order/orderThunk.js";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { clearCart } from "../features/cart/cartSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const address = useSelector((state) => state?.location?.address);
  const restaurantList = useSelector((state) => state.list.restaurantList);
  const restaurantId = useSelector((state) => state.cart.restoId);
  const user = useSelector((state) => state.login.user);
  const totalAmount = useSelector((state) => state.cart.total);
  const Ordersucess = useSelector((state) => state.order.success);

  let name, locality, cloudinaryImageId;
  if (restaurantList?.length > 0 && restaurantId) {
    const restoData = getRestoById(restaurantList, restaurantId);
    ({ name, locality, cloudinaryImageId } = restoData || {});
  }

  const items = useSelector((state) => state.cart.items);

const handlePlaceOrder = () => {
  if (!user) {
    alert("Please login to place an order");
    return;
  }
  setLoading(true);

  dispatch(placeOrders());
};

useEffect(() => {
  if (Ordersucess) {
    setTimeout(()=>{
      setLoading(false);
      dispatch(clearCart());
      navigate("/order-success");
    },2000);
  }
}, [Ordersucess, navigate,dispatch]);

//   if(!name || !locality || !cloudinaryImageId) return <Loader />;
if(loading) return <Loader />;

  return items.length === 0 ? (
    <div className="pt-24 px-4 p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Your Cart is Empty
      </h1>
    </div>
  ) : (
    <div className="pt-24 px-4 bg-gray-300 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-10 p-6 max-w-6xl mx-auto">
        {/* Left Side */}
        <div className="flex flex-col gap-6 w-full  lg:w-2/3">
          <div className="bg-white rounded  p-6 h-88">
            <h1 className="text-black font-bold text-xl">
              Add a delivery address
            </h1>
            <p className="text-gray-600">You seem to be in the new location</p>
            <div className="border-dashed border-gray-300 w-80 h-50 cursor-pointer shadow p-4 mt-8">
              <div className="flex gap-4">
                <FaLocationDot className="text-2xl" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-black text-lg font-bold">
                    {" "}
                    Add New Address
                  </h2>
                  <p className="text-gray-600 text-sm">{address}</p>
                  <button className="p-1 mt-8 text-sm text-green-500 border border-green-400 cursor-pointer font-bold w-28">
                    ADD NEW
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded p-6 h-22">
            <h1 className="text-gray-500 font-bold">Payment</h1>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white p-6 w-full lg:w-1/3 h-116 rounded text-white font-semibold">
          {name && (
            <div className="flex gap-4 items-center">
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                className="w-18 h-[70px] object-cover object-center rounded"
                alt={name}
              />
              <div className="flex flex-col justify-center">
                <h1 className="font-bold text-[18px]  text-black">{name}</h1>
                <h2 className="text-gray-500 text-[14px]">{locality}</h2>
              </div>
            </div>
          )}

          <div className="mt-2">
            <div  className="max-h-60 overflow-y-auto pr-2" >
              {items.map((item) => (
                <div key={item.id} className="py-2">
                  <div className="flex justify-evenly gap-4">
                    {/* Veg/Non-Veg Icon */}
                    <div className="pt-1">
                      <span
                        className={`inline-block w-3 h-3 border-2 rounded-sm ${
                          item?.isVeg
                            ? "border-green-600 bg-green-600"
                            : "border-red-600 bg-red-600"
                        }`}
                      ></span>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <h2 className="text-black font-semibold text-sm">
                           {item?.name?.split(" ").slice(0, 3).join(" ")}
                {item?.name?.split(" ").length > 4 && " ..."}
                      </h2>

                      {/* Quantity Control */}
                      <div className="flex items-center border border-gray-400 rounded mt-2 w-fit px-2 py-1 gap-2">
                        <button
                          onClick={() => dispatch(additems(item))}
                          className="text-green-600 cursor-pointer hover:scale-105 transition-transform"
                        >
                          <IoMdAdd size={12} />
                        </button>

                        <span className="text-sm font-bold text-green-600">
                          {item?.quantity}
                        </span>

                        <button
                          onClick={() => dispatch(decreaseItem(item?.id))}
                          className="text-black cursor-pointer  hover:scale-105 transition-transform"
                        >
                          <IoMdRemove size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-2">
                      <h3 className="text-black font-bold  text-sm whitespace-nowrap">
                        ₹{(item?.price || item?.defaultPrice) / 100}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr className="bg-black border-t border-black my-2" />

            <div className="flex flex-col gap-4 mt-2">
         
              <div className="flex justify-between px-4 items-center">
                <span className="text-black font-bold text-lg">To Pay</span>
                <span className="text-black font-bold text-lg">
                  ₹{totalAmount / 100}
                </span>
              </div>

             
              <div className="flex justify-end">
                <button onClick={handlePlaceOrder} className="bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition duration-300">
                  Place Order
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
