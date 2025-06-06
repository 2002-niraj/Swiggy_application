import { GoDotFill } from "react-icons/go";
import { MdOutlineStarPurple500 } from "react-icons/md";
import oneLogo from "../assets/OneLogo_3x.avif";
const Restaurantinfo = ({ restaurantInfo }) => {
  const {
    avgRatingString,
    totalRatingsString,
    costForTwoMessage,
    cuisines,
    areaName,
    sla,
    aggregatedDiscountInfoV2,
  } = restaurantInfo;

  const { minDeliveryTime, maxDeliveryTime } = sla || {};

  return (
     <div className="w-[820px] px-4 pb-4 mx-60 bg-gray-200 rounded-3xl">
           <div className="text-gray-700 px-6 py-4 bg-white rounded-[20px] border border-gray-300 shadow text-sm mt-1 mb-2">
             <div className="flex items-center gap-1 mb-2">
               <MdOutlineStarPurple500 className="bg-green-700 text-white rounded-xl p-1 h-[20px] w-[20px]" />
               <h2 className="text-base text-black font-bold m-0">
                 {avgRatingString} [{totalRatingsString}]
               </h2>
               <GoDotFill className="text-black" />
               <h3 className="text-black font-bold m-0">{costForTwoMessage}</h3>
             </div>
   
             <h3 className="mb-2 text-orange-600 underline cursor-pointer">
               {cuisines?.join(", ")}
             </h3>
   
             <div className="flex gap-3 mb-2">
               <h3 className="text-black font-bold">📍 Outlet</h3>
               <h3 className="font-extralight text-gray-600">{areaName}</h3>
             </div>
   
             <h3 className="text-black font-bold mb-2">
               🕐 {minDeliveryTime || 25} - {maxDeliveryTime || 30} mins
             </h3>
   
             <hr className="my-4 border-t border-gray-300 opacity-75" />
   
             <div className="flex items-center gap-2">
               <img src={oneLogo} alt="Discount Logo" className="w-14 h-4" />
               <h2 className="text-orange-600 font-semibold">
                 {aggregatedDiscountInfoV2?.header}
               </h2>
             </div>
           </div>
         </div>
  )
};

export default Restaurantinfo;
