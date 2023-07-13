const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const {cors} =require("cors") 
require("dotenv").config();
const { dashRouter } = require("./routes/dash.route");


const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("Employee");
});

app.use("/user", userRouter);
app.use("/dash", dashRouter);


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected To DataBase");
  } catch (error) {
    console.log(error.message);
  }
  console.log("listening At port 3000");
});
