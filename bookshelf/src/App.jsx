import { Box, Container, useColorModeValue, Image } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
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

function App() {
  return (
    
    <Box
      
      // h={'auto'}
     
      // objectFit={"cover"}
      
      // backgroundImage={''}
      // backgroundAttachment={"fixed"}
      // backgroundSize={"90% auto"}
      // backgroundRepeat={"no-repeat"}
      // backgroundPosition={"right"}
      // backgroundOpacity={"30%"}
    >
   
    {/* backGround 3D
      { <Image
        boxSize={"100vh"}
        objectFit={"cover"}
        src={g}
    
        position="absolute"
        top={"-140px"}
        left={"40vw"}
        right={0}
        bottom={0}
        opacity={"90%"}


      /> } */}
    
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

        </Routes>
      </Router>
    </Box>
  );
}

export default App;
