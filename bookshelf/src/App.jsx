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
import Shop from "./pages/Moderator/Shop";
import Orders from "./pages/Moderator/Orders";
import Donations from "./pages/Moderator/Donations";
import Subscriptions from "./pages/Moderator/Subscriptions";
import BookSharing from "./pages/Moderator/BookSharing";
import Setting from "./pages/Moderator/Settings";
import AdddNewBook from "./pages/Moderator/AdddNewBook";

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
<<<<<<< HEAD

          {/* Moderator Routes */}
          <Route exact path="/moderator/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/moderator/notifications" element={<Notifications />}></Route>
          <Route exact path="/moderator/inventry" element={<Inventry />}></Route>
          <Route exact path="/moderator/shop" element={<Shop />}></Route>
          <Route exact path="/moderator/orders" element={<Orders />}></Route>
          <Route exact path="/moderator/donations" element={<Donations />}></Route>
          <Route exact path="/moderator/subscriptions" element={<Subscriptions />}></Route>
          <Route exact path="/moderator/booksharing" element={<BookSharing />}></Route>
          <Route exact path="/moderator/setting" element={<Setting />}></Route>
          <Route exact path="/moderator/addNewBook" element={<AdddNewBook />}></Route>
=======
          <Route exact path="/shop" element={<Shop />}></Route>
          <Route exact path="/shop/:id" element={<ProductPage />}></Route>
          <Route exact path="/cart/:userId" element={<Cart />}></Route>
          {/* <Route exact path="/logout" element={<Logout />}></Route> */}
>>>>>>> 38eea547e56a15ef46523e2411dffa28d0f6ce11
        </Routes>
        <Footer />
        </UserProvider>
      </Router>

      
    </Box>
  );
}

export default App;
