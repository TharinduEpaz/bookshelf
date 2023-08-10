import { Box, Container, useColorModeValue, Image,Icon,useBreakpointValue } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import g from "./assets/g.png";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sharing from "./pages/Sharing/SharingHome";
import SharingPost from "./pages/Sharing/SharingPost";
import Subscription from "./pages/Subscription/SubscriptionHome";
import SelectSubscription from "./pages/Subscription/SelectSubscription";
import SelectBookLover from "./pages/Subscription/SelectBookLover";
import SelectBookReader from "./pages/Subscription/SelectBookReader";
import SelectBookWorm from "./pages/Subscription/SelectBookWorm";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import SelectBook from "./pages/Subscription/SelectBook";
import SelectBookSubscription from "./pages/Subscription/SelectBookSubscription"
import ManageSubscription from "./pages/Subscription/ManageSubscription";
import Cart from "./pages/Cart"



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

function App() {

  return (
    
    <Box>
      <Router>
      <UserProvider>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/sharing" element={<Sharing />}></Route>
          <Route exact path="/sharingPost" element={<SharingPost />}></Route>
          <Route exact path="/subscriptions" element={<Subscription />}></Route>
          <Route exact path="/selectSubscription" element={<SelectSubscription/>}></Route>
          <Route exact path="/selectBookLover" element={<SelectBookLover/>}></Route>
          <Route exact path="/selectBookReader" element={<SelectBookReader/>}></Route>
          <Route exact path="/selectBookWorm" element={<SelectBookWorm/>}></Route>
          <Route exact path="/selectBook" element={<SelectBook/>}></Route>
          <Route exact path="/selectBook/:id" element={<SelectBookSubscription />}></Route>
          <Route exact path="/manageSubscription" element={<ManageSubscription />}></Route>
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
          
        </Routes>
        <Footer />
        </UserProvider>
      </Router>
      <Blur position={'fixed'} top={-10} left={-10} zIndex={-100} style={{ filter: 'blur(70px)' }} />

      
    </Box>
  );
}

export default App;
