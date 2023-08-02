import { Box, Container, useColorModeValue, Image } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
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

function App() {
  return (
    
    <Box>
      <Router>
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
        </Routes>
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
