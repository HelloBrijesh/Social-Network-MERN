import express from "express";
import { DEV_PORT, DB_URL } from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware";
import mongoose from "mongoose";

const app = express();

// Database connection

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("db connected....");
  })
  .catch((e) => {
    console.log(e.message);
  });

app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

const PORT = process.env.PORT || DEV_PORT;

app.listen(PORT, () => {
  console.log(`server started at ${DEV_PORT}`);
});
