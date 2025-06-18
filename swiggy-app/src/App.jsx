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
import Store,{persistor} from "../src/app/Store"
import { PersistGate } from "redux-persist/integration/react";

const Error = lazy(() => import("./components/Error"));
const Search = lazy(() => import("./components/Search"));
const Offers = lazy(() => import("./components/Offers"));
const Help = lazy(() => import("./components/Help"));
const Footer = lazy(() => import("./components/footer"));
const MapPage = lazy(()=>import("./components/NearbyRestaurantsMap"));
const Checkout = lazy(() => import("./components/Checkout"));
const Ordersucess = lazy(() => import("./components/Ordersucess"));
const OrderHistory = lazy(() => import("./components/OrderHistory"));

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
        path: "/map",
        element: (
          <Suspense fallback={<Loader />}>
           <MapPage/>
          </Suspense>
        ),
      }
      ,{
        path:"/checkout",
        element:(
          <Suspense fallback={<Loader />}>
            <Checkout/>
          </Suspense>
        )
      }
      ,
      {
        path:"/order-success",
        element:(
          <Suspense fallback={<Loader />}>
            <Ordersucess/>
          </Suspense>
        )
      }
      ,{
           path:"/order-history",
        element:(
          <Suspense fallback={<Loader />}>
            <OrderHistory/>
          </Suspense>
        )

      }

    ],
  },
]);

export default function App() {
   return (
    <Provider store={Store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
      <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}
