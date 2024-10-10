import { Request, Response } from "express";
import Topic from "../../models/topic.model"


export const index = async (req: Request, res: Response): Promise<void> => {

    const topics = await Topic.find({
        deleted: false,
        status: "active"
    })

    res.render("client/pages/topics/index.pug", {
        pageTitle: "Spotify - Web Player: Music for everyone",
        topics: topics
    })
}