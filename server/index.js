import express from "express";
import { DEV_PORT } from "./config";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use("/api", routes);

app.listen(DEV_PORT, () => {
  console.log(`server started at ${DEV_PORT}`);
});
