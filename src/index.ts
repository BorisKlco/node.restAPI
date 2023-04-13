import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import mongoose, { Error } from "mongoose";
import { MONGO_PASSWORD, MONGO_SERVER, MONGO_USERNAME } from "../mongo";

const app = express();
const MONGO_URL =
  "mongodb+srv://" +
  MONGO_USERNAME +
  ":" +
  MONGO_PASSWORD +
  "@" +
  MONGO_SERVER +
  "/?retryWrites=true&w=majority";

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(9900, () => {
  console.log("Server running");
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
