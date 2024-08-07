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


app.use(cors({
  origin: "http://localhost:3000/",
  methods: 'GET, POST, DELETE',
  credentials: true,
  preflightContinue: true,
  exposedHeaders: '*',
  optionsSuccessStatus: 204
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use((req, res, next) => {
  // Set Access-Control-Allow-Credentials header to true
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


const PORT = 8080
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});




const uri = process.env.MONGO_URI;
mongoose.Promise = Promise;
mongoose.connect(uri);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
