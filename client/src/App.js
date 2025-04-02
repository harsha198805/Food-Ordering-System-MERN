import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrudPost from "./Components/CRUD/CrudPost";
import CrudGet from "./Components/CRUD/CrudGet";
import CrudGetSpecific from "./Components/CRUD/CrudGetSpecific";
import CrudUpdate from "./Components/CRUD/CrudUpdate";
import CrudDelete from "./Components/CRUD/CrudDelete";
import Login from "./Components/Authentication/Login";
import Registration from "./Components/Authentication/Registration";
import LoginJWT from "./Components/Authorization/LoginJWT";
import PostJWT from "./Components/Authorization/PostJWT";
import GetSpecificUserMsgs from "./Components/Authorization/GetSpecificUserMsgs";
import ProtectedRoutesJWT from "./Components/Authorization/ProtectedRoutesJWT";
import GetJWT from "./Components/Authorization/GetJWT";
import LogoutButton from "./Components/Logout";

import LoginPage from "./Components/Pages/LoginPage";
import RegisterPage from "./Components/Pages/RegisterPage";
import UseNavigatePage from "./Components/Pages/UseNavigatePage";
import ParamsPage from "./Components/Pages/ParamsPage";
import MoreInfo from "./Components/Pages/MoreInfo";
import Navigation from "./Components/Pages/Navigation";
import ContactUs from "./Components/Pages/ContactUs";
import Footer from "./Components/Pages/Footer";
import LandingPage from "./Components/Pages/LandingPage";
import AboutUs from "./Components/Pages/AboutUs";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminRoute from "./Components/Admin/AdminRoute";
import ManageRestaurants from "./Components/Admin/ManageRestaurants";
import ManageOrders from "./Components/Admin/ManageOrders";
import ManageUsers from "./Components/Admin/ManageUsers";
import FoodItemTable from "./Components/Restaurant/FoodItemTable";
import RestaurantDashboard from "./Components/Restaurant/RestaurantDashboard";
import CheckoutPage from "./Components/Pages/CheckoutPage";
import SuccessPage from "./Components/Pages/SuccessPage";
import CancelPage from "./Components/Pages/CancelPage";
import ConfirmationPage from "./Components/Pages/ConfirmationPage";

function App() {
  return (
    <div className="App">
      <Router>
        {" "}
        {/* Router at the root level only */}
        <Navigation />{" "}
        {/* This component should NOT contain another <Router> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/usenavigate" element={<UseNavigatePage />} />
          <Route path="/params/:id" element={<ParamsPage />} />
          <Route path="/more-info" element={<MoreInfo />}>
            <Route path="about-us" element={<AboutUs />} />
            <Route path="contact-us" element={<ContactUs />} />
          </Route>
          {/* AdminRoute should not use <Router> again */}
          <Route path="/admin/*" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/restaurants" element={<ManageRestaurants />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route
            path="/restaurant/dashboard"
            element={<RestaurantDashboard />}
          />
          <Route path="/restaurant/food-items" element={<FoodItemTable />} />

          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
