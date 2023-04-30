import express from "express";

const router = express.Router();

router.get("/home", (req, res) => {
  res.json({ status: "1" });
});

export default router;
