import { createSlice } from "@reduxjs/toolkit";
import { AddressDelivery } from "../interfaces/addressDelivery";
import IPurchasedProducts from "../interfaces/purchasedProducts";

interface InitialState {
  methodPayment: string;
  addressDelivery: AddressDelivery | null;
  updateAddressDelivery: boolean;
  purchasedProducts: IPurchasedProducts | null;
}

const initialState: InitialState = {
  methodPayment: "",
  addressDelivery: null,
  updateAddressDelivery: false,
  purchasedProducts: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialState,
  reducers: {
    methodPaymentHandler(state, action) {
      state.methodPayment = action.payload;
    },
    addressDeliveryHandler(state, action) {
      state.addressDelivery = action.payload;
    },
    updateAddressDeliveryHandler(state, action) {
      state.updateAddressDelivery = action.payload;
    },
    purchasedProductsHandler(state, action) {
      state.purchasedProducts = action.payload;
    },
  },
});

export const checkoutActions = checkoutSlice.actions;

export default checkoutSlice.reducer;
