import {  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SwiggyAPI } from "../../constants/api";

export const menuList = createAsyncThunk(
    'menu/menuList',
    async({ latitude, longitude, restaurantId }, { rejectWithValue })=>{

        try{
           const response = await axios.get(
        SwiggyAPI.restaurantMenu(latitude, longitude, restaurantId)
      );

       const data = response.data;

      const restaurantDetails = data?.data?.cards[2]?.card?.card?.info;
      const regularCards =
        data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

      const categories = regularCards.filter(
        (c) =>
          c?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );

      const categoriesList = categories
        ?.filter(
          (category) =>
            category?.card?.card?.title &&
            Array.isArray(category?.card?.card?.itemCards)
        )
        .map((category) => ({
          title: category.card.card.title,
          items: category.card.card.itemCards,
        }));

      // Return the parsed data
      return {
        restaurantInfo: restaurantDetails,
        menuItems: categoriesList
      };

        }
        catch(err){
            return rejectWithValue("Network error. Please try again later.");
        }
    }
)