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


app.use(morgan('dev'));
app.use(express.json());
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



//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(req.cookies);

});

app.use('/api/v1/', authRoutes);
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/books/', bookRoutes);
app.use('/api/v1/subscriptions/', subscriptionRoutes);
app.use('/api/v1/bookSharing/', sharingRoutes);
app.use('/api/v1/orders/', orderRoutes);
app.use('/api/v1/donations/', donationRoutes);
app.use('/api/v1/reviews/', reviewRoutes);

//middleware for error handling
app.use(notFoundMIddleware);
app.use(errorHandlerMiddleware);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
