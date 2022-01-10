const express = require("express");
const app = express(); //
// const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");

const authRouters = require("./routes/authroutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

// Setting Up Express Middleware
// app.use(
//   cors({
//     origin: "http//localhost:3000",
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(authRouters);
app.use(cookieParser());

//Setting Db Connection
mongoose.connect(process.env.DATABASE_URL);
// Checking Db Connection
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected successfully"));
// PORT
app.listen(PORT, () => {
  console.log(`server Started  At ${PORT}`);
});
