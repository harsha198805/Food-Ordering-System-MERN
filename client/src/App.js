import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CrudPost from './Components/CRUD/CrudPost';
import CrudGet from './Components/CRUD/CrudGet';
import CrudGetSpecific from './Components/CRUD/CrudGetSpecific';
import CrudUpdate from './Components/CRUD/CrudUpdate';
import CrudDelete from './Components/CRUD/CrudDelete';
import Login from './Components/Authentication/Login';
import Registration from './Components/Authentication/Registration';
import LoginJWT from './Components/Authorization/LoginJWT';
import PostJWT from './Components/Authorization/PostJWT';
import GetSpecificUserMsgs from './Components/Authorization/GetSpecificUserMsgs';
import ProtectedRoutesJWT from './Components/Authorization/ProtectedRoutesJWT';
import GetJWT from './Components/Authorization/GetJWT';
import LogoutButton from './Components/Logout';

import LoginPage from './Components/Pages/LoginPage';
import RegisterPage from './Components/Pages/RegisterPage';
import UseNavigatePage from './Components/Pages/UseNavigatePage';
import ParamsPage from './Components/Pages/ParamsPage';
import MoreInfo from './Components/Pages/MoreInfo';
import Navigation from './Components/Pages/Navigation';
import ContactUs from './Components/Pages/ContactUs';
import Footer from './Components/Pages/Footer';
import LandingPage from './Components/Pages/LandingPage';
import AboutUs from './Components/Pages/AboutUs';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminRoute from './Components/Admin/AdminRoute';



function App() {
  return (
    <div className="App">
    
    <Router>
<Navigation />

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
        <Route path="/admin/*" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
      
    </div>
  );
}

export default App;
