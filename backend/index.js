//routefile
import express from "express";
import cors from "cors";
import Router from "./routes/routes.js";

//init express
const app = express();

//express json
app.use(express.json());

//cors
app.use(cors());

//router
app.use(Router);

//PORT
app.listen(4000, () => {
  console.log("Server activo en el puerto 4000");
});