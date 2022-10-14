import React, { useCallback, useEffect, useMemo, useState } from "react";
import { shallowEqual } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import User from "./header-navtools/User";
import "./Header.css";
import HeaderCategory from "./header-category";
import ShoppingBasket from "./header-navtools/ShoppingBasket";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { UIActions } from "../../../../../stores/UI-slice";
// import { createSelector } from "@reduxjs/toolkit";
// import { RootState } from "../../../../../stores";
// import { addedShoppingCart, addedFavorite } from "../../../../hooks/selector";

const Header = () => {
  const [gender, setGender] = useState("zeny");
  const [onHover, setOnHover] = useState(false);
  const addedShoppingCart = useAppSelector((state) => state.cartSlice.addedShoppingCart);
  const addedFavorite = useAppSelector((state) => state.cartSlice.addedFavorite);
  const [dataType, setDataType] = useState<string | null>("");
  const dropdown_shoppingCart = useAppSelector((state) => state.UISlice.dropdown_shoppingCart);
  const lengthAddedShoppingCart = addedShoppingCart.length;
  const lengthAddedFavorite = addedFavorite.length;

  const dispatch = useAppDispatch();

  const activeHandler = (type: string) => {
    setGender(type);
  };

  const onMouseHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget;
    setDataType(target.getAttribute("datatype"));
    setOnHover(true);
  };
  const onMouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOnHover(false);
    dispatch(UIActions.dropdown_onHover(true));
    setDataType("");
  };

  const bg_color_header = useAppSelector((state) => state.UISlice.bg_color_header);

  // const callback = useCallback(() => {
  //   console.log(addedShoppingCart);
  // }, [addedShoppingCart]);

  // useEffect(() => {
  //   const unsubscribe = callback();

  //   return unsubscribe;
  // }, [callback]);
  // useEffect(() => {
  //   console.log(addedShoppingCart());
  // }, [addedShoppingCart]);

  return (
    <div className="relative border-b border-[#d0d1d3]">
      <div className=" min-h-[96px]">
        <div className=" hidden lg:block ">
          <div
            className={
              " text-[12px] text-[#666666]   font-[700] transition-colors duration-[1.5s] " +
              (bg_color_header ? "bg-[#cac9c9]" : "bg-[#efeff0]")
            }
          >
            <div className="flex justify-between h-[32px]  items-center mx-6 xl:mx-auto xl:my-0 lg:max-w-[1216px] lg:min-w-[943px]">
              <span className="">Nápověda a kontakt</span>
              <span className="">DOPRAVA A VRÁCENÍ ZDARMA*</span>
              <span className="">Vrácení zboží do 100 dní</span>
            </div>
          </div>
        </div>
        <div className=" lg:px-2 bg-[#ffffff] text-[14px] lg:mx-6 xl:mx-auto xl:my-0 lg:max-w-[1216px] lg:min-w-[943px] ">
          <div className="pt-[8px] h-[60px] flex items-center w-full ">
            {/* gender select start */}
            <ul className="hidden space-x-[8px] basis-1/3 max-w-1/3 text-[16px] font-[700] lg:flex  ">
              <Link to="/home-page">
                <li
                  onClick={() => activeHandler("zeny")}
                  className={"header_gender " + (gender === "zeny" ? "active_gender" : "")}
                >
                  Ženy
                </li>
              </Link>
              <li
                onClick={() => activeHandler("muzi")}
                className={"header_gender " + (gender === "muzi" ? "active_gender" : "")}
              >
                Muži
              </li>
              <li
                onClick={() => activeHandler("deti")}
                className={"header_gender " + (gender === "deti" ? "active_gender" : "")}
              >
                Děti
              </li>
            </ul>
            <Link
              to="/"
              className="basis-1/2 max-w-1/2 pl-[17px] lg:flex lg:justify-center lg:basis-1/3 lg:max-w-1/3  "
            >
              <img
                className="w-[120px] object-cover  "
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Zalando_logo.svg/2560px-Zalando_logo.svg.png"
                alt="logo"
              />
            </Link>
            {/* logo end */}
            {/* navtools start */}
            <div className="relative basis-1/2 max-w-1/2 lg:basis-1/3 lg:max-w-1/3 flex text-[24px] space-x-[3px] justify-end ">
              <div
                onMouseEnter={onMouseHandler}
                onMouseLeave={onMouseLeaveHandler}
                datatype="user"
                className="navtools flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faUser} className="h-5 w-5 object-cover" />
                <div className={"navtools_user-hidden " + (dataType === "user" && onHover ? "navtools_user" : "")}>
                  <User />
                </div>
              </div>
              <Link to="/wardrobe" className=" relative flex justify-center items-center p-[10px] cursor-pointer ">
                <FontAwesomeIcon icon={faHeart} className="h-5 w-5 object-cover" />
                <div className="absolute top-[5px] right-[3px] bg-[#ff6800] h-[16px] w-[16px] rounded-[50px] flex justify-center items-center ">
                  <span className="text-white leading-[1rem] text-[0.75rem]">{lengthAddedFavorite}</span>
                </div>
              </Link>
              <div
                onMouseEnter={onMouseHandler}
                onMouseLeave={onMouseLeaveHandler}
                className={
                  "navtools flex justify-center items-center " + (dropdown_shoppingCart ? "navtools__add" : "")
                }
                datatype="shopping-cart"
              >
                {/* <div className=" "> */}
                <FontAwesomeIcon icon={faBasketShopping} className="h-5 w-5 object-cover" />
                <div className="absolute top-[5px] right-[3px] bg-[#ff6800] h-[16px] w-[16px] rounded-[50px] flex justify-center items-center ">
                  <span className="text-white leading-[1rem] text-[0.75rem]">{lengthAddedShoppingCart}</span>
                </div>
                {/* </div> */}
                <div
                  className={
                    "navtools__basket-hidden " +
                    (dataType === "shopping-cart" && onHover
                      ? "navtools__basket"
                      : dropdown_shoppingCart
                      ? "navtools__basket"
                      : "")
                  }
                >
                  <ShoppingBasket />
                </div>
              </div>
            </div>
            {/* navtools end */}
          </div>
          {/* search start */}
          <div className=" ">
            <HeaderCategory />
          </div>
          {/* search end */}
        </div>
      </div>
    </div>
  );
};

export default Header;
