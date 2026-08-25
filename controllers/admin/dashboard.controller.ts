import { Request, Response } from "express"
import Song from "../../models/song.model"
import Topic from "../../models/topic.model"
import Singer from "../../models/singer.mode"
import Account from "../../models/account.model"
import User from "../../models/user.model"
import FavoriteSong from "../../models/favorite-song.model"

export const index = async (req: Request, res: Response): Promise<void> => {

    const [countSong, countTopic, countSinger, countAccount, countUser, countFavorite] = await Promise.all([
        Song.countDocuments({ deleted: false }),
        Topic.countDocuments({ deleted: false }),
        Singer.countDocuments({ deleted: false }),
        Account.countDocuments({ deleted: false }),
        User.countDocuments({ deleted: false }),
        FavoriteSong.countDocuments({ deleted: false }),
    ])

    const statistic = {
        countSong,
        countTopic,
        countSinger,
        countAccount,
        countUser,
        countFavorite,
    }

    res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Tổng quan Spotify",
        statistic: statistic
    })
}
