import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/Auth/PrivateRoute";
import AuthProvider from "./components/Auth/AuthProvider";
import "./App.css";
import "./styles/globalStyle.css";
import AuthLayout from "./components/Auth/AuthLayout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./constant/theme";
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductListPage from "./pages/ProductListPage";
import ProductPage from "./pages/ProductDetailPage";
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<AuthLayout />}>
                <Route
                  path="/products"
                  element={
                    <PrivateRoute>
                      <ProductListPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <PrivateRoute>
                      <ProductPage />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route path="*" element={<Navigate to="/products" />} />
            </Routes>
            <ToastContainer
              position="bottom-left"
              autoClose={2000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
