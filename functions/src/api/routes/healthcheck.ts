import * as express from "express";

/* eslint new-cap: "warn"*/
const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json({data: "ok"});
});

export default router;
