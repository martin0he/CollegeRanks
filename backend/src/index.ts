import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import { config } from "dotenv";
config();

const app = express();



app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const allowedOrigins = ["https://collegeranks.onrender.com", "http://localhost:3000/"];

  const origin = req.headers.origin as string;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  // You can adjust other CORS headers as needed
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Allow credentials if needed
  res.header("Access-Control-Allow-Credentials", "true");

  // Continue with the request
  next();
});

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});



const uri = process.env.MONGO_URI;
mongoose.Promise = Promise;
mongoose.connect(uri);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
