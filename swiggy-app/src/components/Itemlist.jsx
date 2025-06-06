import { MdOutlineStarPurple500 } from "react-icons/md";
import { useDispatch,useSelector } from 'react-redux';
import { IoMdRemove } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { setRestoId,additems,decreaseItem } from "../features/cart/cartSlice";
const Itemlist = ({restaurantId,items,isCartPage = false }) => {
   const dispatch = useDispatch();
   
const restoIdInCart = useSelector((state) => state.cart.restoId);


const handleAddItems = (item) => {

  if (restoIdInCart === null || restoIdInCart === restaurantId) {
    if (restoIdInCart === null) {
      dispatch(setRestoId(restaurantId));
    }
    dispatch(additems(item));
  } else {
    alert("You can only add items from one restaurant at a time.");
  }
};

   const list = items.map((item)=>item?.card?.info || item);

  return (
    <div >
      {list.map((item) => (
        <div
          key={item?.id}
          className="flex justify-between items-start mb-2 border-b py-4 gap-6"
        >
          <div className="flex-1">
            <div>
              <span
                className={`inline-block w-3 h-3 border-2 rounded-sm mr-2 ${
                  item?.isVeg
                    ? "border-green-600 bg-green-600"
                    : "border-red-600 bg-red-600"
                }`}
              ></span>
            </div>

            <div className="font-bold">{item?.name}</div>
            <div className="text-md font-semibold text-black mb-2">
              ₹
              {(item?.price || item?.defaultPrice) /
                100}
            </div>

            {item?.ratings?.aggregatedRating?.rating && !isCartPage &&(
              <div className="flex gap-1 mb-1">
                <MdOutlineStarPurple500 className="bg-green-700 text-white rounded-xl p-1 h-[20px] w-[20px]" />
                {item?.ratings.aggregatedRating.rating} (
                {item?.ratings.aggregatedRating.ratingCount})
              </div>
            )}

            {item?.description && !isCartPage && (
              <p className="text-sm text-gray-600">
                {item?.description?.split(" ").slice(0, 20).join(" ")}
                {item?.description?.split(" ").length > 20 && ", ..."}
              </p>
            )}

               {isCartPage && (
              <div className="flex items-center border-[0.5px] w-30 gap-3 mt-2">
                <button   onClick={()=>handleAddItems(item)}
                  className="px-3 py-2 cursor-pointer text-green-600 rounded"
                >
                 <IoMdAdd size={20}/>
                </button>

                <span className="text-md text-green-600 font-bold">{item?.quantity}</span>
                <button
                   onClick={() => dispatch(decreaseItem(item?.id))}
                  className="px-3 py-2 cursor-pointer text-black rounded"
                >
                  <IoMdRemove size={20}/>
                </button>
                
              </div>
               )}
          </div>

          {item?.imageId && (
            <div className="relative mb-6">
              <div className="w-[150px] h-[150px] flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={`https://media-assets.swiggy.com/${item?.imageId}`}
                  alt={item?.name}
                  className="w-full h-full object-cover object-center cursor-pointer"
                />

       {!isCartPage &&  (
             <button onClick={()=>handleAddItems(item)} className="absolute left-1/2 bottom-[-24px] cursor-pointer transform -translate-x-1/2 bg-white text-green-600 border border-gray-300 text-[18px] px-9.5 py-1.5 rounded font-bold shadow-md hover:bg-gray-100 transition">
                  ADD
              </button>
)
       }
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Itemlist;
