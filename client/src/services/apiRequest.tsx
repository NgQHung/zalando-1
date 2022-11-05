import axios from "axios";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { uriBase } from "../config/uriBase";
import { Products } from "../interfaces/Products";
import { productShoppingCart } from "../interfaces/ProductShoppingCart";
import { cartActions } from "../stores/cart-slice";
// import { AxiosJWT } from "../utils/authentication/axiosJWT";
import { productActions } from "../stores/product-slice";
import { UIActions } from "../stores/UI-slice";
import { AfterRefresh } from "../utils/pageIsRefreshed";
// import { UIActions } from "./UI-slice";
// import UISlice, { UIActions } from "./UI-slice";
// const axiosJWT = AxiosJWT();

export interface AddShoppingCart {
  id: number | undefined;
  brand: string | undefined;
  name: string | undefined;
  imageUrl: string | undefined;
  currentPrice: number | undefined;
  previousPrice: number | null | undefined;
  isFavorite: boolean;
  amount: number;
  size: string;
  totalProduct: number | undefined;
}

export interface User {
  accessToken: string;
  admin: string;
  email: string;
  firstName: string;
  _id: string;
}

// get all products
export const getProducts = async (dispatch: Dispatch) => {
  let response;
  console.log("getproduct");
  try {
    dispatch(UIActions.loadingPage(true));
    setTimeout(async () => {
      response = await axios.get(`${uriBase.server}/products`);
      const allProducts = await response.data;
      const newAllProduct = allProducts.map((item: Products) => {
        return { ...item, isFavorite: false };
      });
      const getCart = JSON.parse(localStorage.getItem("persist:root")!) || [];
      const addedFavorite = JSON.parse(getCart.cartSlice).addedFavorite;
      // update data from server with data from local storage
      const map = new Map(addedFavorite.map((o: Products) => [o.id, o]));
      const newAllProducts = [...newAllProduct].map((o) => Object.assign({}, o, map.get(o.id)));
      const products_1 = newAllProducts.slice(0, 14);
      const products_2 = newAllProducts.slice(15, 30);
      dispatch(
        productActions.productsHandler({ allProducts: newAllProducts, products_1: products_1, products_2: products_2 })
      );
      dispatch(UIActions.loadingPage(false));
    }, 1000);
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};

// get detail selected product
export const getDetailProduct = async (dispatch: Dispatch, id: number | null) => {
  let response;
  console.log("getdetail");
  let getSelectedId: number;
  if (AfterRefresh()) {
    getSelectedId = JSON.parse(localStorage.getItem("selectedId")!) || [];
    if (getSelectedId) {
      dispatch(productActions.selectedIdHandler(getSelectedId));
    }
  }

  try {
    dispatch(UIActions.loadingPage(true));
    setTimeout(async () => {
      response = await axios.get(`${uriBase.server}/product/${id ? id : getSelectedId}`);
      const detailProduct = response.data;
      dispatch(productActions.selectedProductHandler(detailProduct));
      dispatch(UIActions.loadingPage(false));
    }, 1000);
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};

export const postShoppingCartById = async (dispatch: Dispatch, user: any, data: productShoppingCart[]) => {
  // console.log(data);
  // console.log("post shopping cart");

  const authAxios = axios.create({
    baseURL: uriBase.server,
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    withCredentials: true,
  });
  let response;
  try {
    response = await authAxios.post(`${uriBase.server}/v1/user/${user?._id}/shopping-cart`, { data: data });
  } catch (error: any) {
    toast.error(error.response?.data.message);

    // console.log(error);
  }
};
export const getShoppingCartById = async (dispatch: Dispatch, user: any) => {
  // console.log("get shopping cart");

  const authAxios = axios.create({
    baseURL: uriBase.server,
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    withCredentials: true,
  });
  let response;

  try {
    dispatch(UIActions.loadingPage(true));
    setTimeout(async () => {
      response = await authAxios.get(`${uriBase.server}/v1/user/${user?._id}/shopping-cart/products`);
      dispatch(cartActions.getShoppingCart(response.data[0].data));
      dispatch(UIActions.loadingPage(false));
    }, 1000);
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};

export const postLikedProductById = async (dispatch: Dispatch, user: any, data: productShoppingCart[]) => {
  // console.log(data);
  // console.log("post liked cart");

  const authAxios = axios.create({
    baseURL: uriBase.server,
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    withCredentials: true,
  });

  let response;
  try {
    response = await authAxios.post(`${uriBase.server}/v1/user/${user?._id}/liked`, { data: data });
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};
export const getLikedProductById = async (dispatch: Dispatch, user: any) => {
  // console.log(data);
  // console.log("get liked cart");

  const authAxios = axios.create({
    baseURL: uriBase.server,
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    withCredentials: true,
  });
  let response;
  try {
    response = await authAxios.get(`${uriBase.server}/v1/user/${user?._id}/liked/products`);
    dispatch(cartActions.getLikedProduct(response.data[0].data));
  } catch (error: any) {
    toast.error(error.response?.data.message);
  }
};