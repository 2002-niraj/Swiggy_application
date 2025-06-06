import Features from "./Features";
import RestoCardList from "./RestoCardList";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";

export default function Restocards() {

const { loading,restaurantList} = useSelector((state)=>state.list);


  return (
    <div className="w-full pt-26 px-4 flex flex-col gap-2 ">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-4 text-left mx-24">
        Restaurants with online food delivery in Pune
      </h1>
      <Features />
      {(loading || restaurantList?.length === 0)? <Shimmer/> : <RestoCardList data={restaurantList} />}
      
    </div>
  );
}
