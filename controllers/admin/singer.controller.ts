import { Request, Response } from "express"
import Singer from "../../models/singer.mode"
import Song from "../../models/song.model"
import { systemConfig } from "../../config/system"
import { checkPermission, notPermission } from "../../middlewares/admin/auth.middleware"

export const index = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "singers_view")) {
        notPermission(res);
        return;
    }

    // Tối ưu N+1: 2 query song song, đếm số bài hát bằng Map
    const [singers, songs] = await Promise.all([
        Singer.find({ deleted: false }),
        Song.find({ deleted: false }, "singerId"),
    ])

    const songCountMap = new Map<string, number>()
    for (const song of songs) {
        songCountMap.set(song.singerId, (songCountMap.get(song.singerId) || 0) + 1)
    }

    for (const singer of singers) {
        singer["countSong"] = songCountMap.get(singer.id) || 0;
    }

    res.render("admin/pages/singers/index.pug", {
        pageTitle: "Quản lý ca sĩ",
        singers: singers
    })
}

export const changeStatus = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "singers_edit")) {
        notPermission(res);
        return;
    }

    const status = req.params.status;
    const singerId = req.params.singerId;

    await Singer.updateOne({
        _id: singerId,
        deleted: false
    }, {
        status: status
    })

    res.redirect("back")
}

export const detail = async (req: Request, res: Response): Promise<void> => {
    const singerId = req.params.singerId;

    const singer = await Singer.findOne({
        _id: singerId,
        deleted: false,
    });

    const songs = await Song.find({
        singerId: singerId,
        deleted: false,
    })

    res.render("admin/pages/singers/detail.pug", {
        pageTitle: 'Spotify Singers',
        singer: singer,
        songs: songs
    })

}

export const create = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "singers_create")) {
        notPermission(res);
        return;
    }

    res.render("admin/pages/singers/create.pug", {
        pageTitle: `Spotify's Singers`
    })
}

export const createPost = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "singers_create")) {
        notPermission(res);
        return;
    }

    const singerObject = {
        fullName: req.body.fullName,
        avatar: req.body.avatar,
        status: req.body.status,
    }

    const singer = new Singer(singerObject);
    await singer.save()

    req.flash('success', `Spotify đã thêm ca sĩ ${singerObject.fullName} thành công!`);
    res.redirect(`/${systemConfig.prefixAdmin}/singers`)
}

export const edit = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "singers_edit")) {
        notPermission(res);
        return;
    }

    const singerId = req.params.singerId;

    const singer = await Singer.findOne({
        _id: singerId,
        deleted: false,
    })

    res.render("admin/pages/singers/edit.pug", {
        pageTitle: `Spotify's Singers`,
        singer: singer
    })
}

export const editPatch = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "singers_edit")) {
        notPermission(res);
        return;
    }

    const singerId = req.params.singerId;

    const singerObject = {
        fullName: req.body.fullName,
        avatar: req.body.avatar,
        status: req.body.status,
    }

    await Singer.updateOne({
        _id: singerId,
        deleted: false,
    }, singerObject)

    req.flash('success', `Spotify đã cập nhật ca sĩ thành công!`);
    res.redirect("back")
}

export const deleteSinger = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "singers_delete")) {
        notPermission(res);
        return;
    }

    const singerId = req.params.singerId;

    await Singer.updateOne({
        _id: singerId,
    }, {
        deleted: true,
        deletedAt: new Date(),
    })

    req.flash('success', `Spotify đã xóa ca sĩ thành công!`);

    res.redirect("back")
}
