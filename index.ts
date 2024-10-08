import express, { Express, Request, Response } from "express";
import env from "dotenv";
env.config();

import { connect } from "./config/database"
connect()
import clientRoutes from "./routes/client";
import adminRoutes from "./routes/admin";
import { systemConfig } from "./config/system";
import path from "path";

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static("public"));

app.use("/tinymce", express.static(path.join(__dirname, "node_modules", "tinymce")
))

app.locals.prefixAdmin = systemConfig.prefixAdmin;

clientRoutes(app); // Router for client 
adminRoutes(app)


app.listen(port, () => {
    console.log(`Chay tren cong ${port}`)
})