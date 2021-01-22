const express = require("express");
const dotenv = require("dotenv");
const path = require('path')
const connectDB = require("./config/db");
const colors = require("colors");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();



// accept json data in body
app.use(express.json());



// connecting to Database
connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);



// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

const dirname = path.resolve()
app.use('/uploads', express.static(path.join(dirname, '/uploads')))
console.log(path.join(dirname, '/uploads'));
// making folder static (so it can get loaded into browser)

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// app.use('/uploads',express.static(path.join(__dirname,'/uploads')))



app.use(notFound);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
