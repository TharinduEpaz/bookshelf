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

import g from "./assets/g.png";

import { UserProvider } from "./context/userContext";
import { BooksProvider } from "./context/booksContext";
import { CartProvider } from "./context/cartContext";

import {
  Account,
  Cart,
  Home,
  Login,
  ProductPage,
  Register,
  Shop,
} from "./pages";

import { Dashboard, Settings, Orders, Chat } from "./components/Account";

import { PrivateRoutes } from "./utils/privateRoutes";

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

// Import Moderator Pages
import Dashboard from "./pages/Moderator/M_Dashboard";
import Notifications from "./pages/Moderator/M_Notifications";
import Inventry from "./pages/Moderator/M_Inventry";
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

            <Route element={<PrivateRoutes />}>

              <Route exact path="/account" element={<Account />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="settings" element={<Settings />} />
                <Route path="orders" element={<Orders />} />
                <Route path="chat" element={<Chat />} />
              </Route>




            </Route>
  
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
          
          </CartProvider>
          </BooksProvider>
        </UserProvider>
      </Router>
    </Box>
  );
}
//fe

export default App;
