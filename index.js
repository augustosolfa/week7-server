import express from "express";
import dotenv from "dotenv";
import processoRoute from "./routes/processo.routes.js";

dotenv.config();
const { PORT } = process.env;

const app = express();
app.use(express.json());

app.use("/", processoRoute);

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
