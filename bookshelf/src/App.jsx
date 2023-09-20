import {
  Box,
  Container,
  useColorModeValue,
  Image,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";


import { UserProvider } from "./context/userContext";
import { BooksProvider } from "./context/booksContext";
import { CartProvider } from "./context/cartContext";
import SharingHome from "./pages/sharing/SharingHome";
import PostRequest from "./pages/sharing/postrequest";
import ShareRequest from "./components/Sharing/ShareRequest";
import ShareBook from "./components/Sharing/ShareBook";
import ManageRequest from "./pages/sharing/ManageRequest"

import {
  Account,
  Cart,
  Home,
  Login,
  ProductPage,
  Register,
  Shop,
  Checkout,
} from "./pages";

import { Dashboard, Settings, Orders, Chat } from "./components/Account";

import { PrivateRoutes } from "./utils/privateRoutes";

// import {Account, Cart, Home, Login, ProductPage, Register, Shop} from "./pages";

// import {Dashboard, Settings, Orders, Chat} from "./components/Account";

const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="100%" cy="100%" r="100%" fill="hsla(1334, 86%, 52%, 0.2)" />
      {/* <circle cx="100%" cy="100%" r="100%" fill="hsla(343, 91%, 58%, 1)" /> */}
      <circle cx="85%" cy="43%" r="50%" fill="hsla(194, 89%, 52%, 0.2)" />
    </Icon>
  );
};



import g from "./assets/g.png";
import Subscription from "./pages/Subscription/SubscriptionHome";
import SelectSubscription from "./pages/Subscription/SelectSubscription";
import SelectPackage from "./pages/Subscription/SelectPackage";
import SelectBook from "./pages/Subscription/SelectBook";
import SelectBookSubscription from "./pages/Subscription/SelectBookSubscription"
import ManageSubscription from "./pages/Subscription/ManageSubscription";
import SelectedSubscriptionPackage from "./components/Subscription/SelectedSubscriptionPackage";

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

// Import Moderator Pages
import M_Dashboard from "./pages/Moderator/M_Dashboard";
import Notifications from "./pages/Moderator/M_Notifications";
import Inventory from "./pages/Moderator/M_Inventory";
import Shop_M from "./pages/Moderator/M_Shop";
import M_Orders from "./pages/Moderator/M_Orders";
import Donations from "./pages/Moderator/M_Donations";
import Subscriptions from "./pages/Moderator/M_Subscriptions";
import BookSharing from "./pages/Moderator/M_BookSharing";
import Setting from "./pages/Moderator/M_Settings";
import AdddNewBook from "./pages/Moderator/M_AddNewBook";
import Moderator from "./pages/Moderator/Moderator";

import Donation from "./pages/Donation"
import Don_home from "./pages/Don_home";
import DonationRequest from "./pages/DonationRequest";
// import StripeCheckout from "./pages/StripeCheckout";


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
        <BooksProvider>
        <CartProvider>
        
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/shop" element={<Shop />}></Route>
            <Route exact path="/shop/:id" element={<ProductPage />}></Route>
            <Route exact path="/cart/:userId" element={<Cart />}></Route>
            <Route exact path="/checkout" element={<Checkout />}></Route>
            {/* <Route exact path="/stripe" element={<StripeCheckout />}></Route> */}


          {/* <Route element={<PrivateRoutes />}> */}

          <Route exact path="/account" element={<Account />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path = "settings" element={<Settings />} />
            <Route path = "orders" element={<Orders />} />
            <Route path = "chat" element={<Chat />} />
          </Route>
          {/* </Route> */}


            <Route exact path="/subscriptions" element={<Subscription />}></Route>
            <Route exact path="/selectSubscription" element={<SelectSubscription />}></Route>
            <Route exact path="selectBook" element={<SelectBook />} ></Route>
            <Route exact path="/selectPackage" element={<SelectPackage />}></Route>
            <Route exact path="/selectBook/:id" element={<SelectBookSubscription />}></Route>
         

            <Route exact path="/selectPackage" element={<SelectPackage />}>
                  <Route index element={<SelectedSubscriptionPackage />} />
                  <Route path="details" element={<SelectedSubscriptionPackage />} />
              <Route path="selectBook" element={<SelectBook />} />
              <Route path="manageSubscription" element={<ManageSubscription />} />
              <Route path="chat" element={<Chat />} />
            </Route>



          <Route exact path="/sharing" element={<SharingHome />}></Route>

          <Route exact path="/PostRequest" element={<PostRequest />}>
          <Route index element={<ShareBook />} />
            <Route path="shareBook" element={<ShareBook/>} />
            <Route path="shareRequest" element={<ShareRequest />} />
            <Route path="ManageRequest" element={<ManageRequest />} />
            <Route path="chat" element={<Chat />} />
          </Route> 

          <Route exact path="/donation" element={<Donation />}></Route>
          <Route exact path="/Don_home" element={<Don_home />}></Route>
          <Route exact path="/DonationRequest" element={<DonationRequest/>}></Route>

          <Route element={<PrivateRoutes />}>

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

          {/* Moderator Routes */}
          
          </Route>
         
          <Route  path="/moderator/" element={<Moderator />}>
            <Route index element={<M_Dashboard />} />
            <Route path="dashboard" element={<M_Dashboard />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="shop_M" element={<Shop_M />} />
            <Route path="orders" element={<M_Orders />} />
            <Route path="donations" element={<Donations />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="booksharing" element={<BookSharing />} />
            <Route path="setting" element={<Setting />} />
            <Route path="addNewBook" element={<AdddNewBook />} />
          </Route>
         

              </Routes>
          <Footer />
          
          </CartProvider>
          </BooksProvider>
        </UserProvider>
      </Router>
    </Box>
  );
}
// gg

export default App;
