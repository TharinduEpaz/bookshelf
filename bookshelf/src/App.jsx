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
import Dashboard from "./pages/Moderator/M_Dashboard";
import Notifications from "./pages/Moderator/M_Notifications";
import Inventry from "./pages/Moderator/Inventry";
import Shop_M from "./pages/Moderator/M_Shop";
import Orders from "./pages/Moderator/M_Orders";
import Donations from "./pages/Moderator/M_Donations";
import Subscriptions from "./pages/Moderator/M_Subscriptions";
import BookSharing from "./pages/Moderator/M_BookSharing";
import Setting from "./pages/Moderator/M_Settings";
import AdddNewBook from "./pages/Moderator/M_AddNewBook";
import Moderator from "./pages/Moderator/Moderator";

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
          <Route  path="/moderator/" element={<Moderator />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="inventry" element={<Inventry />} />
            <Route path="shop_M" element={<Shop_M />} />
            <Route path="orders" element={<Orders />} />
            <Route path="donations" element={<Donations />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="booksharing" element={<BookSharing />} />
            <Route path="setting" element={<Setting />} />
            <Route path="addNewBook" element={<AdddNewBook />} />
          </Route>
        </Routes>
        <Footer />
        </UserProvider>
      </Router>

      
    </Box>
  );
}

export default App;
