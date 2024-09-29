import express, { Express, Request, Response } from "express";
import env from "dotenv";
env.config();

import { connect } from "./config/database"
import Topic from "./models/topic.model";


connect()

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

app.set('views', './views')
app.set('view engine', 'pug')

app.get("/", async (req: Request, res: Response) => {

    const topics = await Topic.find({
        deleted: false,
    })

    console.log(topics)

    res.render("client/pages/topics/index.pug")
})

app.listen(port, () => {
    console.log(`Chay tren cong ${port}`)
})