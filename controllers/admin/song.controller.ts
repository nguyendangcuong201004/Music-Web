import { Request, Response } from "express"
import Song from "../../models/song.model"
import Singer from "../../models/singer.mode"
import Topic from "../../models/topic.model"
import { systemConfig } from "../../config/system"


export const index = async (req: Request, res: Response): Promise<void> => {
    
    const songs = await Song.find({
        deleted: false,
    })

    for (const song of songs) {
        const singer = await Singer.findOne({
            _id: song.singerId,
            deleted: false,
        })
        const topic = await Topic.findOne({
            _id: song.topicId,
            deleted: false
        })
        song["topic"] = topic.title;
        song["singer"] = singer.fullName;
    }

    res.render("admin/pages/songs/index.pug", {
        pageTitle: `Spotify's Songs`,
        songs: songs
    })
}

export const changeStatus = async (req: Request, res: Response): Promise<void> => {
    const songId = req.params.songId;
    const status = req.params.status;

    await Song.updateOne({
        _id: songId,
        deleted: false,
    }, {
        status: status
    })

    res.redirect("back")
}

export const detail = async (req: Request, res: Response): Promise<void> => {
    const songId = req.params.songId;
    
    const song = await Song.findOne({
        _id: songId,
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

    res.render("admin/pages/songs/detail.pug", {
        pageTitle: `${song.title}`,
        song: song,
        singer: singer,
        topic: topic
    })
}

export const deleteSong = async (req: Request, res: Response): Promise<void> => {
    const songId = req.params.songId;
    const song = await Song.findOne({
        _id: songId,
        deleted: false,
    })

    await Song.updateOne({
        _id: songId
    }, {
        deleted: true
    })

    req.flash("success", `Spotify đã xóa ${song.title} thành công!`)
    res.redirect("back")
}


export const create = async (req: Request, res: Response): Promise<void> => {
    const topics = await Topic.find({
        deleted: false
    })

    const singers = await Singer.find({
        deleted: false,
    })

    res.render("admin/pages/songs/create.pug", {
        pageTitle: "Spotify Upload",
        topics: topics,
        singers: singers
    })
}


export const createPost = async (req: Request, res: Response): Promise<void> => {

    if (req.body.avatar){
        req.body.avatar = req.body.avatar[0];
    }

    if (req.body.audio){
        req.body.audio = req.body.audio[0];
    }

    const song = new Song(req.body);
    await song.save();

    res.redirect(`/${systemConfig.prefixAdmin}/songs`)
}