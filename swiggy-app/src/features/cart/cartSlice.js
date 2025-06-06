import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
     restoId: null, 
  },
  reducers: {

    setRestoId: (state, action) => {
            state.restoId = action.payload;  
    },

    additems: (state, action) => {

      const item = action.payload;

      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    decreaseItem: (state, action) => {

        
      const itemId = action.payload;

      const existingItem = state.items.find((i) => i.id === itemId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== itemId);
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.restoId = null;
    },
  },
});

export const { setRestoId,additems, decreaseItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
