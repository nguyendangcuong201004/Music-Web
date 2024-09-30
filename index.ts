import express, { Express, Request, Response } from "express";
import env from "dotenv";
env.config();

import { connect } from "./config/database"
connect()
import clientRoutes from "./routes/client";

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static("public"));

clientRoutes(app); // Router for client 


app.listen(port, () => {
    console.log(`Chay tren cong ${port}`)
})