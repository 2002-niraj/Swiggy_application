import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import { Suspense, lazy } from "react";
import Restocards from "./components/Restocards";
import AppLayout from "./components/AppLayout";
import Shimmer from "./components/Shimmer";
import Loader from "./components/Loader";
import RestaurantMenu from "./components/RestaurantMenu";
import {Provider} from "react-redux"
import Store from "../src/app/Store"
const Error = lazy(() => import("./components/Error"));
const Search = lazy(() => import("./components/Search"));
const Offers = lazy(() => import("./components/Offers"));
const Help = lazy(() => import("./components/Help"));
const Footer = lazy(() => import("./components/footer"));
const CartPage = lazy(()=>import("./components/CartPage"));
const MapPage = lazy(()=>import("./components/NearbyRestaurantsMap"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: (
      <Suspense fallback={<Shimmer />}>
        <Error />
      </Suspense>
    ),
    children: [
      { 
        index:true,
        element: (
          <>

            <Restocards />
            <Suspense fallback={<Loader />}>
              <Footer />
            </Suspense>
          </>
        ),
      },
      {
        path: "restaurant/:restaurantId",
        element: <RestaurantMenu />,
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<Loader />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "/Offers",
        element: (
          <>
            <Suspense fallback={<Loader />}>
              <Offers />
              <Footer />
            </Suspense>
          </>
        ),
      },
      {
        path: "/help",
        element: (
          <Suspense fallback={<Loader />}>
            <Help />
          </Suspense>
        ),
      },
        {
        path: "/cart",
        element: (
          <Suspense fallback={<Loader />}>
           <CartPage/>
          </Suspense>
        ),
      }
      ,
          {
        path: "/map",
        element: (
          <Suspense fallback={<Loader />}>
           <MapPage/>
          </Suspense>
        ),
      }

    ],
  },
]);

export default function App() {
   return (
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
