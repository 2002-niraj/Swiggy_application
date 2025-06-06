import { useParams } from "react-router-dom";
import RestaurantMenuContent from "./RestaurantMenuContent";
import {useEffect} from "react";
import { useDispatch,useSelector} from "react-redux";
import {menuList} from "../features/menuList/menuThunk.js"
import Loader from "./Loader.jsx";

export default function RestaurantMenu() {
  const { restaurantId } = useParams();

const dispatch = useDispatch();
const { latitude, longitude} = useSelector((state) => state.location);
const loading = useSelector((state) => state.menu.loading); 

useEffect(() => {
  if (latitude && longitude && restaurantId) {
    dispatch(menuList({
      latitude: latitude,
      longitude: longitude,
      restaurantId
    }));
  }
}, [latitude,longitude, restaurantId, dispatch]);

 if (loading) return <Loader />;

  return (
    <RestaurantMenuContent restaurantId={restaurantId} />
  );
}
