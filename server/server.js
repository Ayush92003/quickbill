import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import invoiceRoutes from "./src/routes/invoiceRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();



app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://quickbill-xi.vercel.app",
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
