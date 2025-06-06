import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice"
import Itemlist from "../components/Itemlist";
import getRestoById from "../utils/getRestoById";

const CartPage = ()=>{
       const dispatch = useDispatch();

  const restaurantList  = useSelector((state)=>state.list.restaurantList)
  const cartItems = useSelector((state) => state.cart.items);
  const restaurantId = useSelector((state)=>state.cart.restoId)
      
   let name, locality, cloudinaryImageId;
  if (restaurantList?.length > 0 && restaurantId) {
    const restoData = getRestoById(restaurantList, restaurantId);
    ({ name, locality, cloudinaryImageId } = restoData || {});
  }

  const total = cartItems.reduce((acc, item) => {
    const price = item.price || item.defaultPrice || 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  return (
     <div className=" pt-24 px-4 p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className=" mt-2 text-xl text-center">Your cart is empty.</p>
      ) : (
        <> 

         <div className="mt-4 border-b-1 pb-2 mb-4 flex gap-4 items-center">
            <div>
               <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                className="w-22 h-[92px] object-cover object-center"
                alt="image"
              />
            </div>

            <div className="flex flex-col gap-2 justify-center">
                <h1 className="font-bold text-xl">{name}</h1>
                <h2 className="text-gray-500">{locality}</h2>
            </div>

         </div>

          <Itemlist restaurantId={restaurantId} items={cartItems} isCartPage={true} />

          <div className="mt-6 font-bold text-xl">Total: ₹{total / 100}</div>

          <button
            onClick={() => dispatch(clearCart())}
            className="mt-4 cursor-pointer px-4 py-2 bg-black text-white rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  )

}

export default CartPage;