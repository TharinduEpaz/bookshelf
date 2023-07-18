const express = require("express");
const app = express();
const port = 3000;

const userRoutes = require("./routes/userRoutes");

// const user = require('./models/user');
// const buyer = require('./models/buyer');

// app.get('/', (req, res) => {

//     user.sync().then(() => {
//         console.log("user table created");

//       });
//       res.send('Hello World!');
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/v1/user', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
