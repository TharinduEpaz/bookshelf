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
import AdminDashboard from "./pages/AdminDashboard";
import AdminNotifications from "./pages/AdminNotifications";
import AdminUserMgt from "./pages/AdminUserMgt";
import AdminShop from "./pages/AdminShop";
import AdminInventory from "./pages/AdminInventory";
import AdminDonations from "./pages/AdminDonations";
import AdminSubscriptions from "./pages/AdminSubscriptions";
import AdminSettings from "./pages/AdminSettings";

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
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/shop" element={<Shop />}></Route>
          <Route exact path="/shop/:id" element={<ProductPage />}></Route>
          <Route exact path="/admindashboard" element={<AdminDashboard />}></Route>
          <Route exact path="/adminnotifications" element={<AdminNotifications />}></Route>
          <Route exact path="/adminusermgt" element={<AdminUserMgt />}></Route>
          <Route exact path="/adminshop" element={<AdminShop />}></Route>
          <Route exact path="/admininventory" element={<AdminInventory />}></Route>
          <Route exact path="/admindonations" element={<AdminDonations />}></Route>
          <Route exact path="/adminsubscriptions" element={<AdminSubscriptions />}></Route>
          <Route exact path="/adminsettings" element={<AdminSettings />}></Route>

        </Routes>
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
