/** @format */

import * as express from "express";
import { writeRecord } from "../db/records";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const p = require("../../package.json");

// eslint-disable-next-line new-cap
const router = express.Router();

// http://localhost:5001/assess-me-45967/us-central1/api/v1/status
router.get("/status", (req, res) => {
  res.json({
    status: "/api/v1/status/",
    version: p.version,
    ts: new Date(),
  });
});

// POST
// http://localhost:5001/assess-me-45967/us-central1/api/v1/record
router.post("/record", async (req, res) => {
  const { id, uuid } = await writeRecord(req.body);
  res.json({ body: req.body, id, uuid });
});

export default router;
