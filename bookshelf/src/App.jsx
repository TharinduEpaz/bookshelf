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
import PostRequest from "./pages/sharing/PostRequest";
import ShareRequest from "./components/Sharing/ShareRequest";
import ShareBook from "./components/Sharing/ShareBook";
import ManageRequest from "./pages/sharing/ManageRequest";

import {
  Account,
  Cart,
  Home,
  Login,
  ProductPage,
  Register,
  Shop,
  Checkout,
  PaymentSuccess,
  PaymentError,
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


// Import Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminNotifications from "./pages/Admin/AdminNotifications";
import AdminUserMgt from "./pages/Admin/AdminUserMgt";
import AdminShop from "./pages/Admin/AdminShop";
import AdminInventory from "./pages/Admin/AdminInventory";
import AdminDonations from "./pages/Admin/AdminDonations";
import AdminSubscriptions from "./pages/Admin/AdminSubscriptions";
import AdminSettings from "./pages/Admin/AdminSettings";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminBookSharing from "./pages/Admin/AdminBookSharing";
import AdminComplaints from "./pages/Admin/AdminComplaints";
import AdminAddNewBook from "./pages/Admin/AdminAddNewBook";
import AdminReports from "./pages/Admin/AdminReports";
import AdminInventoryReports from "./pages/Admin/AdminInventoryReports";
import AdminUserReport from "./pages/Admin/AdminUserReport";
import AdminSubscriptionReports from "./pages/Admin/AdminSubscriptionReports";
import AdminDonationReport from "./pages/Admin/AdminDonationReport";
import AdminSharingReports from "./pages/Admin/AdminSharingReports";
import AdminOrderReport from "./pages/Admin/AdminOrderReport";
import AdminUsersReportViewTable from "./components/Admin/AdminUsersReportViewTable";
import AdminOrderReportViewTable from "./components/Admin/AdminOrderReportViewTable";
import AdminInventoryReportViewTable from "./components/Admin/AdminInventoryReportViewTable";
import AdminSharingReportViewTable from "./components/Admin/AdminSharingReportViewTable";
import AdminSubscriptionMgtTabs from "./components/Admin/AdminSubscriptionMgtTabs";
import AdminSubscriptionMgt from "./pages/Admin/AdminSubscriptionMgt";
import AdminSubscriptionOrders from "./pages/Admin/AdminSubscriptionOrders";
import AdminComplaintsTable from "./components/Admin/AdminComplaintsTable";
import AdminDonationReportViewTable from "./components/Admin/AdminDonationReportViewTable";
import SubscriptionReportTableView from "./components/Admin/SubscriptionReportTableView";

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
import AddDonationPack from "./pages/Moderator/M_AddDonationPack";

import Donation from "./pages/Donation"
import Donation_Reg from "./pages/Donation_Reg"
import Don_home from "./pages/Don_home";
import DonationRequest from "./pages/DonationRequest";
import DonationAcc from "./pages/DonationAcc";
import BestSellers from "./pages/BestSellers";
import Romance from "./pages/Romance";
import Collections from "./pages/Collections";
import SelfHelp from "./pages/SelfHelp";
import Fiction from "./pages/Fiction";
// import StripeCheckout from "./pages/StripeCheckout";
import DonationDetails from "./pages/DonationDetails";


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
            <Route exact path="/donate/:id" element={<DonationDetails />}></Route>
            <Route exact path="/cart/:userId" element={<Cart />}></Route>
            <Route exact path="/checkout" element={<Checkout />}></Route>
            <Route exact path="/bestSellers" element={<BestSellers />}></Route>
            <Route exact path="/romance" element={<Romance />}></Route>
            <Route exact path="/collections" element={<Collections />}></Route>
            <Route exact path="/selfHelp" element={<SelfHelp />}></Route>
            <Route exact path="/Fiction" element={<Fiction />}></Route>
            <Route exact path="/paymentsuccess" element={<PaymentSuccess/>} />
            <Route exact path="/paymenterror" element={<PaymentError/>} />
        

            {/* <Route exact path="/stripe" element={<StripeCheckout />}></Route> */}
            <Route exact path="/checkout" element={<Checkout />}></Route>


            <Route element={<PrivateRoutes />}>

          <Route exact path="/account" element={<Account />}>

            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path = "settings" element={<Settings />} />
            <Route path = "orders" element={<Orders />} />
            <Route path = "chat" element={<Chat />} />
            
          </Route>
          </Route>


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
            <Route path="shareBook/chat" element={<Chat />} />
          </Route> 

          <Route exact path="/donation" element={<Donation />}></Route>
          <Route exact path="/Don_home" element={<Don_home />}></Route>
          <Route exact path="/Donation_Reg" element={<Donation_Reg/>}></Route>
          <Route exact path="/DonationRequest" element={<DonationRequest/>}></Route>
          <Route exact path="/DonationAcc" element={<DonationAcc/>}></Route>
          <Route epath="setting" element={<Setting />} />
          
          {/* <Route exact path="/DonationDetails" element={<DonationDetails/>}></Route> */}

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
          <Route exact path="/adminreports" element={<AdminReports />}></Route>
          <Route exact path="/admininventoryreports" element={<AdminInventoryReports />}></Route>
          <Route exact path="/adminuserreport" element={<AdminUserReport />}></Route>
          <Route exact path="/adminsubscriptionreports" element={<AdminSubscriptionReports />}></Route>
          <Route exact path="/admindonationreport" element={<AdminDonationReport />}></Route>
          <Route exact path="/adminsharingreport" element={<AdminSharingReports />}></Route>
          <Route exact path="/adminorderreport" element={<AdminOrderReport />}></Route>
          <Route exact path="/adminusersreportviewtable" element={<AdminUsersReportViewTable />}></Route>
          <Route exact path="/adminorderreportviewtable" element={<AdminOrderReportViewTable />}></Route>
          <Route exact path="/admininventoryreportviewtable" element={<AdminInventoryReportViewTable />}></Route>
          <Route exact path="/adminsharingreportviewtable" element={<AdminSharingReportViewTable />}></Route>
          <Route exact path="/adminsubscriptionmgt" element={<AdminSubscriptionMgt />}></Route>
          <Route exact path="/adminsubscriptionmgttabs" element={<AdminSubscriptionMgtTabs />}></Route>
          <Route exact path="/adminsubscriptionorders" element={<AdminSubscriptionOrders />}></Route>
          <Route exact path="/admincomplaintstable" element={<AdminComplaintsTable />}></Route>
          <Route exact path="/admindonationreportviewtable" element={<AdminDonationReportViewTable />}></Route>
          <Route exact path="/subscriptionreporttableview" element={<SubscriptionReportTableView />}></Route>


      
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
            <Route path="addDonationPack" element={<AddDonationPack />} />
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
