import { Box, Container, useColorModeValue, Image,Icon,useBreakpointValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import g from "./assets/g.png";



import {UserProvider} from './context/userContext';

import {Account, Cart, Home, Login, ProductPage, Register, Shop} from "./pages";

import {Dashboard, Settings, Orders, Chat} from "./components/Account";

const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
    <circle cx="100%" cy="100%" r="100%" fill="hsla(1334, 86%, 52%, 0.2)" />
      {/* <circle cx="100%" cy="100%" r="100%" fill="hsla(343, 91%, 58%, 1)" /> */}
      <circle cx="85%" cy="43%" r="50%" fill="hsla(194, 89%, 52%, 0.2)" />
    </Icon>
  )
}

// Import Moderator Pages
//import Dashboard from "./pages/Moderator/Dashboard";
import Notifications from "./pages/Moderator/Notifications";
import Inventry from "./pages/Moderator/Inventry";
import Shop_M from "./pages/Moderator/Shop_M";
//import Orders from "./pages/Moderator/Orders";
import Donations from "./pages/Moderator/Donations";
import Subscriptions from "./pages/Moderator/Subscriptions";
import BookSharing from "./pages/Moderator/BookSharing";
import Setting from "./pages/Moderator/Settings";
import AdddNewBook from "./pages/Moderator/AdddNewBook";


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

          <Route exact path="/account" element={<Account />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path = "settings" element={<Settings />} />
            <Route path = "orders" element={<Orders />} />
      
            <Route path = "chat" element={<Chat />} />
          </Route>
          

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
      <Blur position={'fixed'} top={-10} left={-10} zIndex={-100} style={{ filter: 'blur(70px)' }} />

      
    </Box>
  );
}

export default App;
