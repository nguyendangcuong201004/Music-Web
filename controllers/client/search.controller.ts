import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.mode";
import unidecode from "unidecode"
import { title } from "process";

export const result = async (req: Request, res: Response): Promise<void> => {

    const type = req.params.type;

    const keyword: string = `${req.query.keyword}`;

    const unidecodeText :string = unidecode(`${keyword}`);
    const slug = unidecodeText.replace(/\s+/g, "-");
    const slugRegex = new RegExp(slug, "i");

    const keywordRegex = new RegExp(keyword, "i");

    let songsDetail = [];

    if (keyword){
        const songs = await Song.find({
            $or: [
                { title: keywordRegex },
                { slug: slugRegex }
            ],
            deleted: false,
            status: "active"
        })
    
        for (const song of songs) {
            const singer = await Singer.findOne({
                _id: song.singerId,
                deleted: false,
            })
            song["singer"] = singer;
            songsDetail.push({
                id: song.id,
                avatar: song.avatar,
                title: song.title,
                slug: song.slug,
                audio: song.audio,
                singer: singer,
                like: song.like,
                lyrics: song.lyrics,
            })
        }

        if (type == "result"){
            res.render("client/pages/search/result", {
                pageTitle: `Kết quả tìm kiếm cho ${keyword}`,
                keyword: keyword,
                songs: songsDetail,
            })
        }
        else {
            res.json({
                code: 200,
                songs: songsDetail,
                testcase: keyword,
            })
        }
    }
    else res.redirect("/topics")
    
}