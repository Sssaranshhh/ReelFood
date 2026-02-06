// start server
import dotenv from "dotenv"
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

dotenv.config();
connectDB();

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000/");
});
