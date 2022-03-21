/** @format */
import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import apiRouter from "./apiRouter";
import { logger } from "firebase-functions";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse application/json
app.use(express.json());

// Automatically allow cross-origin requests
app.use(cors());

// mount api router
// http://localhost:5001/assess-me-45967/us-central1/api/v1/status
app.use("(/api)?/v1/", apiRouter);

// the last route, is a 404 route
app.use((req, res) => {
  logger.log("404", req.path);
  res.status(404);
  res.json({ status: "404" });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, req: any, res: any, next: any) => {
  const statusCode = err.statusCode || 500;
  logger.error({ statusCode, err });
  res.status(statusCode);
  res.json({ status: statusCode, message: err });
});

export default functions.https.onRequest(app);
