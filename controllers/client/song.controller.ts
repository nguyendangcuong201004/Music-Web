import { Request, Response } from "express";
import Topic from "../../models/topic.model"
import Song from "../../models/song.model";
import Singer from "../../models/singer.mode";
import FavoriteSong from "../../models/favorite-song.model";


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

    const favoriteSong = await FavoriteSong.findOne({
        songId: song.id,
        deleted: false,
    })
    
    if (favoriteSong){
        song["favorite"] = true;
    }
    else song["favorite"] = false;
    
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

export const favoritePatch =  async (req: Request, res: Response): Promise<void> => {
    const status = req.params.status;
    const id = req.params.songId;
    
    if (status == "favorite"){
        const favoriteSong = new FavoriteSong({
            userId: "",
            songId: id,  
        })
        await favoriteSong.save();
    }
    else {
        await FavoriteSong.deleteOne({
            songId: id
        });
    }

    res.json({
        code: 200,
        message: status == "favorite" ? "Đã thêm vào thư viện" : "Đã xóa khỏi thư viện"
    })

}

export const playlist =  async (req: Request, res: Response): Promise<void> => {

    const myPlaylist = await FavoriteSong.find({
        deleted: false,
    })

    for (const item of myPlaylist) {
        const song = await Song.findOne({
            _id: item.songId,
            deleted: false,
        })
        item["song"] = song;
        const singer = await Singer.findOne({
            _id: song.singerId,
            deleted: false,
        })
        item["singer"] = singer;
    }

    res.render("client/pages/songs/favorite.pug", {
        pageTitle: `My Playlist`,
        myPlaylist: myPlaylist,
    })

}

export const listenPatch =  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.songId;

    const song = await Song.findOne({
        _id: id,
        status: "active",
        deleted: false,
    })

    const listenUpdate = song.listen + 1;

    await Song.updateOne({
        _id: id,
        status: "active",
        deleted: false,
    }, {
        listen: listenUpdate
    })

    res.json({
        code: 200,
        message: "Đã cập nhật số stream",
        listen: listenUpdate
    })
}