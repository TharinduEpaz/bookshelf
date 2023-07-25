const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

//middleware
const notFoundMIddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler')
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
app.use(morgan('dev'));
app.use(express.json());

app.use(cookieParser(process.env.JWT_SECRET));


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(req.cookies);

});

app.use('/api/v1/', authRoutes);
app.use('/api/v1/users/', userRoutes);

//middleware for error handling
app.use(notFoundMIddleware);
app.use(errorHandlerMiddleware);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
