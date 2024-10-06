import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.mode";

export const result = async (req: Request, res: Response): Promise<void> => {

    const keyword: string = `${req.query.keyword}`;
    const keywordRegex = new RegExp(keyword, "i");

    const songs = await Song.find({
        title: keywordRegex,
        deleted: false,
        status: "active"
    })

    for (const song of songs) {
        const singer = await Singer.find({
            _id: song.singerId,
            deleted: false,
        })
        song["singer"] = singer;
    }

    res.render("client/pages/search/result", {
        pageTitle: `Kết quả tìm kiếm cho ${keyword}`,
        keyword: keyword,
        songs: songs,
    })
}