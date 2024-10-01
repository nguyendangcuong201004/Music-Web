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
        pageTitle: `Nhạc ${topic.title}`,
        topic: topic,
        songs: songs
    })
}

export const songDetail = async (req: Request, res: Response): Promise<void> => {
    
    const slug = req.params.slug;
    const song = await Song.findOne({
        slug: slug,
        deleted: false,
    })

    const singer = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
    })

    const topic = await Topic.findOne({
        _id: song.topicId,
        deleted: false,
    })
    
    res.render("client/pages/songs/detail.pug", {
        pageTitle: `${song.title} - ${singer.fullName}`,
        song: song,
        singer: singer,
        topic: topic
    })
}

export const like = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.songId;
    const status = req.params.status;

    const song = await Song.findOne({
        _id: id,
        deleted: false,
        status: "active",
    })

    let updateLike = song.like;
    if (status == "like"){
        updateLike += 1;
    }
    else updateLike -= 1;

    await Song.updateOne({
        _id: id
    }, {
        like: updateLike
    })

    res.json({
        code: 200,
        message: "Return after like song!",
        like: updateLike
    })
}