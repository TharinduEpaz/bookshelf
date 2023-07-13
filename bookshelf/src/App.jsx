import { Box, Container, useColorModeValue, Image } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import g from "./assets/g.png";

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

      <Navbar />
    
      
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
