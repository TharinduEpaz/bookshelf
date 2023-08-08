import { Box, Container, useColorModeValue, Image } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import g from "./assets/g.png";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart"

import { useState, useMemo } from "react";


import {UserProvider} from './context/userContext';

// Import Moderator Pages
import Dashboard from "./pages/Moderator/Dashboard";
import Notifications from "./pages/Moderator/Notifications";
import Inventry from "./pages/Moderator/Inventry";
import Shop_M from "./pages/Moderator/Shop_M";
import Orders from "./pages/Moderator/Orders";
import Donations from "./pages/Moderator/Donations";
import Subscriptions from "./pages/Moderator/Subscriptions";
import BookSharing from "./pages/Moderator/BookSharing";
import Setting from "./pages/Moderator/Settings";
import AdddNewBook from "./pages/Moderator/AdddNewBook";

// import admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminNotifications from "./pages/AdminNotifications";
import AdminUserMgt from "./pages/AdminUserMgt";
import AdminShop from "./pages/AdminShop";
import AdminInventory from "./pages/AdminInventory";
import AdminDonations from "./pages/AdminDonations";
import AdminSubscriptions from "./pages/AdminSubscriptions";
import AdminSettings from "./pages/AdminSettings";
import AdminOrders from "./pages/AdminOrders";
import AdminBookSharing from "./pages/AdminBookSharing";
import AdminComplaints from "./pages/AdminComplaints";
import AdminAddNewBook from "./pages/AdminAddNewBook";

function App() {

  return (
    
    <Box
      // objectFit={"cover"}
      // backgroundImage={''}
      // backgroundAttachment={"fixed"}
      // backgroundSize={"90% auto"}
      // backgroundRepeat={"no-repeat"}
      // backgroundPosition={"right"}
      // backgroundOpacity={"30%"}
      
    >
   
    {/* backGround 3D */}
      {/* <Image
        boxSize={"100vh"}
        objectFit={"cover"}
        src={g}
    
        position="absolute"
        top={"-140px"}
        left={"40vw"}
        right={0}
        bottom={0}
        opacity={"90%"}


      /> */}
     
    
      <Router>
      <UserProvider>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/shop" element={<Shop />}></Route>
          <Route exact path="/shop/:id" element={<ProductPage />}></Route>
          <Route exact path="/cart/:userId" element={<Cart />}></Route>
          {/* <Route exact path="/logout" element={<Logout />}></Route> */}

          {/* Moderator Routes */}
          <Route exact path="/moderator/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/moderator/notifications" element={<Notifications />}></Route>
          <Route exact path="/moderator/inventry" element={<Inventry />}></Route>
          <Route exact path="/moderator/shop_M" element={<Shop_M />}></Route>
          <Route exact path="/moderator/orders" element={<Orders />}></Route>
          <Route exact path="/moderator/donations" element={<Donations />}></Route>
          <Route exact path="/moderator/subscriptions" element={<Subscriptions />}></Route>
          <Route exact path="/moderator/booksharing" element={<BookSharing />}></Route>
          <Route exact path="/moderator/setting" element={<Setting />}></Route>
          <Route exact path="/moderator/addNewBook" element={<AdddNewBook />}></Route>
          {/* Admin Routes */}
          <Route exact path="/admindashboard" element={<AdminDashboard />}></Route>
          <Route exact path="/adminnotifications" element={<AdminNotifications />}></Route>
          <Route exact path="/adminusermgt" element={<AdminUserMgt />}></Route>
          <Route exact path="/admininventory" element={<AdminInventory />}></Route>
          <Route exact path="/adminorders" element={<AdminOrders />}></Route>
          <Route exact path="/admindonations" element={<AdminDonations />}></Route>
          <Route exact path="/adminsubscriptions" element={<AdminSubscriptions />}></Route>
          <Route exact path="/adminbooksharing" element={<AdminBookSharing />}></Route>
          <Route exact path="/admincomplaints" element={<AdminComplaints />}></Route>
          <Route exact path="/adminsettings" element={<AdminSettings />}></Route>
          <Route exact path="/adminaddnewbook" element={<AdminAddNewBook />}></Route>

        </Routes>
        <Footer />
        </UserProvider>
      </Router>

      
    </Box>
  );
}

export default App;
