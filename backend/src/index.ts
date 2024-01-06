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

app.use(
  cors({
    origin: "https://collegeranks.onrender.com",
    credentials: true,
  })
);



app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});

// Enable CORS for specific origin and with credentials
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  cors({
    origin: "https://collegeranks.onrender.com",
    credentials: true,
  })(req, res, (err?: any) => {
    if (err) {
      return next(err);
    }
    next();
  });
});

const uri = process.env.MONGO_URI;
mongoose.Promise = Promise;
mongoose.connect(uri);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
