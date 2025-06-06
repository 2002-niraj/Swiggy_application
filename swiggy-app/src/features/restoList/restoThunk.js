import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SwiggyAPI } from "../../constants/api";

const restoList = createAsyncThunk(
  "list/restoList",
  async ( {latitude, longitude},  {rejectWithValue} ) => {
  
    try {
      if (!latitude || !longitude) return [];

      const response = await axios.get(
        SwiggyAPI.restaurantList(latitude,longitude)
      );

      const data = response.data;

      const cards =
        data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

        const restaurantInfos = cards.map((card, idx) => {
        const info = card.info;
        const offset = (info?.sla?.lastMileTravel || 0.1) * 0.009; // ~1km in degrees
        const angle = (idx / cards.length) * 2 * Math.PI;

        return {
          ...info, // include full restaurant info
          latitude: latitude + offset * Math.cos(angle),
          longitude: longitude + offset * Math.sin(angle),
        };
      });
      return restaurantInfos;
    } catch (err) {
      return rejectWithValue("Network error. Please try again later.");
    }
  }
);

export default restoList;
