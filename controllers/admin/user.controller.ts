import { Request, Response } from "express"
import User from "../../models/user.model"
import FavoriteSong from "../../models/favorite-song.model"
import { systemConfig } from "../../config/system"
import { hashPassword } from "../../helpers/hashPassword.helper"

export const index = async (req: Request, res: Response): Promise<void> => {

    // Tối ưu N+1: 2 query song song, đếm lượt yêu thích bằng Map
    const [users, favorites] = await Promise.all([
        User.find({ deleted: false }),
        FavoriteSong.find({ deleted: false }, "userId"),
    ])

    const favoriteCountMap = new Map<string, number>()
    for (const favorite of favorites) {
        favoriteCountMap.set(favorite.userId, (favoriteCountMap.get(favorite.userId) || 0) + 1)
    }

    for (const user of users) {
        user["countFavorite"] = favoriteCountMap.get(user.id) || 0;
    }

    res.render("admin/pages/users/index.pug", {
        pageTitle: "Tài khoản user",
        users: users
    })
}

export const changeStatus = async (req: Request, res: Response): Promise<void> => {
    const status = req.params.status;
    const userId = req.params.userId;

    await User.updateOne({
        _id: userId,
        deleted: false
    }, {
        status: status
    })

    res.redirect("back")
}

export const create = async (req: Request, res: Response): Promise<void> => {

    res.render("admin/pages/users/create.pug", {
        pageTitle: `Tạo tài khoản user`
    })
}

export const createPost = async (req: Request, res: Response): Promise<void> => {

    const emailExists = await User.findOne({
        email: req.body.email,
        deleted: false,
    })

    if (emailExists) {
        req.flash('error', `Email ${req.body.email} đã tồn tại!`);
        res.redirect("back")
        return;
    }

    const userObject = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashPassword(req.body.password),
        phone: req.body.phone,
        avatar: req.body.avatar,
        status: req.body.status,
    }

    const user = new User(userObject);
    await user.save()

    req.flash('success', `Spotify đã thêm tài khoản ${userObject.fullName} thành công!`);
    res.redirect(`/${systemConfig.prefixAdmin}/users`)
}

export const edit = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;

    const user = await User.findOne({
        _id: userId,
        deleted: false,
    })

    res.render("admin/pages/users/edit.pug", {
        pageTitle: `Chỉnh sửa tài khoản user`,
        user: user
    })
}

export const editPatch = async (req: Request, res: Response): Promise<void> => {

    const userId = req.params.userId;

    const emailExists = await User.findOne({
        _id: { $ne: userId },
        email: req.body.email,
        deleted: false,
    })

    if (emailExists) {
        req.flash('error', `Email ${req.body.email} đã tồn tại!`);
        res.redirect("back")
        return;
    }

    const userObject: any = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        avatar: req.body.avatar,
        status: req.body.status,
    }

    // Chỉ cập nhật mật khẩu khi người dùng nhập mới
    if (req.body.password) {
        userObject.password = hashPassword(req.body.password);
    }

    await User.updateOne({
        _id: userId,
        deleted: false,
    }, userObject)

    req.flash('success', `Spotify đã cập nhật tài khoản user thành công!`);
    res.redirect("back")
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {

    const userId = req.params.userId;

    await User.updateOne({
        _id: userId,
    }, {
        deleted: true,
        deletedAt: new Date(),
    })

    req.flash('success', `Spotify đã xóa tài khoản user thành công!`);

    res.redirect("back")
}
