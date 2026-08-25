import { Request, Response } from "express"
import Account from "../../models/account.model"
import { systemConfig } from "../../config/system"
import { hashPassword } from "../../helpers/hashPassword.helper"

// [GET] /admin/my-account
export const index = async (req: Request, res: Response): Promise<void> => {

    res.render("admin/pages/my-account/index.pug", {
        pageTitle: "Trang thông tin cá nhân"
    })
}

// [GET] /admin/my-account/edit
export const edit = async (req: Request, res: Response): Promise<void> => {

    res.render("admin/pages/my-account/edit.pug", {
        pageTitle: "Chỉnh sửa thông tin cá nhân"
    })
}

// [PATCH] /admin/my-account/edit
export const editPatch = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.user.id;

    const userObject: any = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        avatar: req.body.avatar,
    }

    // Chỉ cập nhật mật khẩu khi người dùng nhập mới
    if (req.body.password) {
        userObject.password = hashPassword(req.body.password);
    }

    await Account.updateOne({
        _id: userId,
        deleted: false,
    }, userObject)

    req.flash("success", "Cập nhật thông tin cá nhân thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/my-account`)
}
