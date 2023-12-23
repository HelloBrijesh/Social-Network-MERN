import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { PORT } from "./constants.js";

dotenv.config();

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error : ", error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`Server is running at : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection Failed : ", error);
  });
