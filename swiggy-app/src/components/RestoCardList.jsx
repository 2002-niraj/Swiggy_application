import { MdOutlineStarPurple500 } from 'react-icons/md';
import { GoDotFill } from "react-icons/go";
import { Link } from 'react-router-dom';

export default function RestoCardList({ data }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-2">
      {data?.map((restaurant) => (
        <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
          <div className="bg-white cursor-pointer m-3 rounded-xl w-[254px] transition-all duration-300 hover:scale-95">
            <div className="relative shadow-lg rounded-2xl overflow-hidden">
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant.cloudinaryImageId}`}
                className="w-full h-[160px] object-cover object-center"
                alt="image"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent px-4 py-2">
                {restaurant.aggregatedDiscountInfoV3?.header &&
                  restaurant.aggregatedDiscountInfoV3?.subHeader && (
                    <p className="text-white font-bold text-xl">
                      {restaurant.aggregatedDiscountInfoV3.header +
                        " " +
                        restaurant.aggregatedDiscountInfoV3.subHeader}
                    </p>
                  )}
              </div>
            </div>
            <div className="p-2">
              <h3 className="text-lg font-semibold">
                {restaurant.name?.split(" ").slice(0, 4).join(" ")}
                {restaurant.name?.split(" ").length > 4 && " ..."}
              </h3>
              <div className="flex items-center gap-1 mb-1">
                <MdOutlineStarPurple500 className="bg-green-700 text-white rounded-xl p-1 h-[20px] w-[20px]" />
                <h2 className="font-medium">{restaurant.avgRating ?? 4}</h2>
                <GoDotFill className="text-black" />
                <h2 className="text-gray-700 font-bold">
                  {restaurant.sla?.slaString}
                </h2>
              </div>
              <p className="text-sm font-extralight text-[rgba(2,6,12,0.6)] mb-1">
                {restaurant.cuisines?.slice(0, 3).join(", ")}
                {restaurant.cuisines?.length > 3 && " ..."}
              </p>
              <p className="font-extralight text-[rgba(2,6,12,0.6)] mb-1">
                {restaurant?.areaName || " "}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
