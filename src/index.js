import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server started at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MONGODB CONNECTION FAILED`, error);
  });
