import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Loader from "./Loader";
import { Link } from "react-router-dom";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
 iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // you can use any public URL or import your own image
  iconSize: [32, 32],      // size of the icon
  iconAnchor: [16, 32],    // point of the icon which corresponds to marker's location
  popupAnchor: [0, -32],   // point from which the popup should open relative to the iconAnchor
});


const NearbyRestaurantsMap = () => {

 const { latitude, longitude} = useSelector((state) => state.location);

  const restaurants = useSelector((state) => state.list.restaurantList || []);


  if (!latitude || !longitude || !restaurants) return <Loader/>;

  return (
    <div className="mt-22 px-24 p-4  box-border ">
            <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      <Marker position={[latitude, longitude]} icon={customIcon}   >
        <Popup>You are here</Popup>
      </Marker>

   {restaurants.map((resto, idx) => (
<Marker key={idx} position={[resto?.latitude, resto?.longitude]}>
  <Popup>
    <div style={{ textAlign: "center", width: "70px" }}>
      <strong className="font-bold" >{resto?.name}</strong>
      <br />
      {resto?.locality || resto?.areaName}
      <br />
      <Link to={`/restaurant/${resto.id}`}>
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/${resto.cloudinaryImageId}`}
          alt={resto.name}
          style={{
            width: "100%",
            borderRadius: "8px",
            marginTop: "5px",
            cursor: "pointer",
          }}
        />
      </Link>
    </div>
  </Popup>
</Marker>
))}
         </MapContainer>
    </div>
  );
};

export default NearbyRestaurantsMap;
