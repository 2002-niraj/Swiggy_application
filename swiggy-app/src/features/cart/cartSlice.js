import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    restoId: null,
    total: 0,
  },
  reducers: {
    setRestoId: (state, action) => {
      state.restoId = action.payload;
    },

    additems: (state, action) => {
      const item = action.payload;
      const price = item.price || item.defaultPrice || 0;

      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.total += price;
    },

    decreaseItem: (state, action) => {
      const itemId = action.payload;

      const existingItem = state.items.find((i) => i.id === itemId);

      if (existingItem) {
        const price = existingItem.price || existingItem.defaultPrice || 0;

        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.total -= price;
        } else {
     
          state.items = state.items.filter((i) => i.id !== itemId);
          state.total -= price * (existingItem.quantity || 1);

          if(state.items.length === 0) {
            state.restoId = null; // Clear restoId if cart is empty
          }
          
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.restoId = null;
      state.total = 0; 
    },
  },
});

export const { setRestoId, additems, decreaseItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
