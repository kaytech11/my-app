
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import "./index.css";
import ProductDetails from "./pages/productdetails";
import Checkout from "./pages/checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ProductSearch from "./pages/productsearch";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoute from "./pages/ProtectedRoute"; 
import Orders from "./pages/Orders"
import "./animation.css";
import ResetPassword from "./pages/Resetpassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="signin" element={<Signin />} /> {/* ✅ lowercase */}
        <Route path="reset-password" element={<ResetPassword />} /> {/* ✅ lowercase */}
        <Route path="signup" element={<Signup />} /> {/* ✅ lowercase */}
        <Route path="productsearch" element={<ProductSearch />} /> {/* ✅ lowercase */}
        <Route path="orders" element={<Orders />} /> {/* ✅ lowercase */}

        {/* Protected routes */}
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
