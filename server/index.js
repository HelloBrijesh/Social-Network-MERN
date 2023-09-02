import express from "express";
import { DEV_PORT } from "./config";
import routes from "./routes";
import { errorHandler } from "./middleware";

const app = express();

app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

app.listen(DEV_PORT, () => {
  console.log(`server started at ${DEV_PORT}`);
});
