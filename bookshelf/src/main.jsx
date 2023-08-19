import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { extendTheme, CSSReset } from "@chakra-ui/react";
import "@fontsource/montserrat/";
import "@fontsource/dm-serif-display";
import "@fontsource/space-grotesk";

const theme = extendTheme({
  fonts: {
    heading: "Bricolage Grotesque, sans-serif",
    body: "Montserrat, sans-serif",
  },
  styles: {
    global: {
      body: {
        bgGradient:"linear(to bottom, rgba(135, 206, 235, 0.5), rgba(30, 144, 255, 0.3))",
        paddingTop: "70px",

      },
    },
  },
});





import { ChakraProvider } from "@chakra-ui/react";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
 
      <App />
    
    </ChakraProvider>
  </React.StrictMode>
);
