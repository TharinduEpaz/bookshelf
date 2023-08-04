import { Box, Container, useColorModeValue, Image } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import g from "./assets/g.png";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
      
      h={"200vh"}
     
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
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
