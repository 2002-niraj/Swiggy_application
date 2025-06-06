import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLocationThunk = createAsyncThunk(
  "location/fetch",
  async (_, { rejectWithValue }) => {
    if (!navigator.geolocation) {
      return rejectWithValue("Geolocation not supported");
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await fetch(
              `https://www.swiggy.com/dapi/misc/address-recommend?latlng=${latitude},${longitude}`
            );
            const data = await res.json();
            const formatted = data?.data?.[0]?.formatted_address || "Address not found";

            resolve({ latitude, longitude, address: formatted });
          } catch (err) {
            resolve({ latitude, longitude, address: "Address fetch failed" });
          }
        },
        (err) => reject(rejectWithValue("Geolocation failed"))
      );
    });
  }
);
