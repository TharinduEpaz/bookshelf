const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

//middleware
const notFoundMIddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler')
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});
//special stripe webhook route to identify stripe events
const endpointSecret = "whsec_099e4fd43f801933fde14fd5bac8b8e1b41fd4afb26f9b389ea16c78d8706255";

app.use(morgan('dev'));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload());

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));



const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const sharingRoutes = require("./routes/sharingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const donationRoutes = require("./routes/donationRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const notificationsRoutes = require("./routes/notificationsRoutes");
const orderController = require("./controllers/orderController");
const donationRequestsRoutes = require("./routes/donationRequestsRoutes");




//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(req.cookies);

});


app.post('/api/v1/webhook', express.raw({type: 'application/json'}), (request, response) => {
  
  const sig = request.headers['stripe-signature'];
  
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }


  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':

      const checkoutSessionCompleted = event.data.object;
      const customer = stripe.customers.retrieve(checkoutSessionCompleted.customer)
      console.log(customer);
      orderController.create_order_by_webhook_data(checkoutSessionCompleted)

      // Then define and call a function to handle the event checkout.session.completed
      break;
    case 'checkout.session.expired':
      const checkoutSessionExpired = event.data.object;
      
      console.log(checkoutSessionExpired);
      // Then define and call a function to handle the event checkout.session.expired
      break;
      case 'customer.created':
        console.log(event.data.object);
    // ... handle other event types
    default:
      
      console.log(`Unhandled event type ${event.type}`);
  }
  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

//===========================================================================

app.use(express.json());

app.use('/api/v1/', authRoutes);
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/books/', bookRoutes);
app.use('/api/v1/subscriptions/', subscriptionRoutes);
app.use('/api/v1/bookSharing/', sharingRoutes);

app.use('/api/v1/orders/', orderRoutes);
app.use('/api/v1/donations/', donationRoutes);
app.use('/api/v1/reviews/', reviewRoutes);


app.use('/api/v1/notifications/', notificationsRoutes);

app.use('/api/v1/donationRequests/', donationRequestsRoutes);

//middleware for error handling
app.use(notFoundMIddleware);
app.use(errorHandlerMiddleware);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
