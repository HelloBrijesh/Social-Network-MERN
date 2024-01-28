import express from "express";
// import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";

const app = express();

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "25kb" }));
app.use(express.urlencoded({ extended: true, limit: "25kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1", routes);

app.use(express.static("dist"));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "dist", "index.html"))
);

app.use(errorHandler);

export { app };
