import React, { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DefaultLayout from "./app/components/layouts/DefaultLayout";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { publicRoutes } from "./app/routes";
import { cartActions } from "./stores/cart-slice";
import { getProducts } from "./stores/apiRequest";
import { loadingHandler } from "./stores/UI-slice";

function App() {
  const dispatch = useAppDispatch();
  const addedShoppingCart = useAppSelector((state) => state.cartSlice.addedShoppingCart);

  React.useEffect(() => {
    try {
      getProducts(dispatch);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    loadingHandler(dispatch, 300, "total");
    dispatch(cartActions.calculateTotals());
  }, [addedShoppingCart]);

  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, idx) => {
          let Layout: any = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          const PageComponent = route.component;

          const pathHome = "/home-page";

          return (
            <Route
              key={idx}
              element={
                route.redirect ? (
                  <Navigate to={pathHome} />
                ) : (
                  <Layout>
                    <PageComponent />
                  </Layout>
                )
              }
              path={route.path}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
