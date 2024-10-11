import express, { Express, Request, Response } from "express";
import env from "dotenv";
env.config();

import { connect } from "./config/database"
connect()
import clientRoutes from "./routes/client";
import adminRoutes from "./routes/admin";
import { systemConfig } from "./config/system";
import path from "path";
import methodOverride from "method-override";
import bodyParser from "body-parser";
import flash from "express-flash"
import cookieParser  from "cookie-parser";
import session from "express-session"

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;



app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')


app.use(cookieParser('NDCNDTN'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use("/tinymce", express.static(path.join(__dirname, "node_modules", "tinymce")
))

app.use(express.static(`${__dirname}/public`));
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))

app.locals.prefixAdmin = systemConfig.prefixAdmin;

clientRoutes(app); // Router for client 
adminRoutes(app)


app.listen(port, () => {
    console.log(`Chay tren cong ${port}`)
})