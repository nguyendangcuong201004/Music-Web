import { Request, Response } from "express";
import Topic from "../../models/topic.model"
import Song from "../../models/song.model";
import Singer from "../../models/singer.mode";


export const list = async (req: Request, res: Response): Promise<void> => {

    const slug = req.params.slug;

    const topic = await Topic.findOne({
        slug: slug,
        deleted: false,
    })

    const songs = await Song.find({
        topicId: topic.id,
        deleted: false,
    })

    for (const song of songs) {
        const singer = await Singer.findOne({
            _id: song.singerId,
            deleted: false,
        })
        song["singer"] = singer.fullName;
    }

    res.render("client/pages/songs/list.pug", {
        pageTitle: "Spotify - Web Player: Music for everyone",
        topic: topic,
        songs: songs
    })
}