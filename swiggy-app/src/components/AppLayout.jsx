import Header from "./Header";
import { Outlet } from "react-router-dom";

import useOnlineStatus from "../utils/useOnlineStatus";
import restoThunk from "../features/restoList/restoThunk.js"
import {getLocationThunk} from "../features/location/locationThunk.js";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";

const AppLayout = () => {

  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(getLocationThunk());
  }, [dispatch]);

    const { latitude, longitude, address } = useSelector((state) => state.location);

    useEffect(() => {
    if (latitude && longitude) {
      dispatch(restoThunk({ latitude, longitude}));
    }
  }, [latitude, longitude, address, dispatch]);

  const status = useOnlineStatus();

  if(!status) return ( <div className="fixed top-0 left-0 w-full bg-red-100 text-red-700 text-center font-semibold py-3 z-50 shadow-md animate-slide-down">
    🚫 You’re offline. Trying to reconnect...
  </div> )

  return (
    <div>
        <Header />
        <Outlet />
    </div>
  );
};

export default AppLayout;
