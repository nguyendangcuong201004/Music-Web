import { Request, Response } from "express"
import Account from "../../models/account.model"
import Role from "../../models/role.model"
import { systemConfig } from "../../config/system"
import { hashPassword } from "../../helpers/hashPassword.helper"
import { checkPermission, notPermission } from "../../middlewares/admin/auth.middleware"

export const index = async (req: Request, res: Response): Promise<void> => {

    const accounts = await Account.find({
        deleted: false,
    })

    for (const account of accounts) {
        const role = await Role.findOne({
            _id: account.roleId,
            deleted: false,
        })
        account["role"] = role ? role.title : "";
    }

    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Tài khoản admin",
        accounts: accounts
    })
}

export const changeStatus = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "accounts_edit")) {
        notPermission(res);
        return;
    }

    const status = req.params.status;
    const accountId = req.params.accountId;

    await Account.updateOne({
        _id: accountId,
        deleted: false
    }, {
        status: status
    })

    res.redirect("back")
}

export const create = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "accounts_create")) {
        notPermission(res);
        return;
    }

    const roles = await Role.find({
        deleted: false,
    })

    res.render("admin/pages/accounts/create.pug", {
        pageTitle: `Tạo tài khoản admin`,
        roles: roles
    })
}

export const createPost = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "accounts_create")) {
        notPermission(res);
        return;
    }

    const emailExists = await Account.findOne({
        email: req.body.email,
        deleted: false,
    })

    if (emailExists) {
        req.flash('error', `Email ${req.body.email} đã tồn tại!`);
        res.redirect("back")
        return;
    }

    const accountObject = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashPassword(req.body.password),
        phone: req.body.phone,
        avatar: req.body.avatar,
        roleId: req.body.roleId,
        status: req.body.status,
        createdBy: res.locals.user.id,
    }

    const account = new Account(accountObject);
    await account.save()

    req.flash('success', `Spotify đã thêm tài khoản ${accountObject.fullName} thành công!`);
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
}

export const edit = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "accounts_edit")) {
        notPermission(res);
        return;
    }

    const accountId = req.params.accountId;

    const account = await Account.findOne({
        _id: accountId,
        deleted: false,
    })

    const roles = await Role.find({
        deleted: false,
    })

    res.render("admin/pages/accounts/edit.pug", {
        pageTitle: `Chỉnh sửa tài khoản admin`,
        account: account,
        roles: roles
    })
}

export const editPatch = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "accounts_edit")) {
        notPermission(res);
        return;
    }

    const accountId = req.params.accountId;

    const emailExists = await Account.findOne({
        _id: { $ne: accountId },
        email: req.body.email,
        deleted: false,
    })

    if (emailExists) {
        req.flash('error', `Email ${req.body.email} đã tồn tại!`);
        res.redirect("back")
        return;
    }

    const accountObject: any = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        avatar: req.body.avatar,
        roleId: req.body.roleId,
        status: req.body.status,
    }

    // Chỉ cập nhật mật khẩu khi người dùng nhập mới
    if (req.body.password) {
        accountObject.password = hashPassword(req.body.password);
    }
    accountObject.updatedBy = res.locals.user.id;

    await Account.updateOne({
        _id: accountId,
        deleted: false,
    }, accountObject)

    req.flash('success', `Spotify đã cập nhật tài khoản thành công!`);
    res.redirect("back")
}

export const deleteAccount = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "accounts_delete")) {
        notPermission(res);
        return;
    }

    const accountId = req.params.accountId;

    await Account.updateOne({
        _id: accountId,
    }, {
        deleted: true,
        deletedAt: new Date(),
        deletedBy: res.locals.user.id,
    })

    req.flash('success', `Spotify đã xóa tài khoản thành công!`);

    res.redirect("back")
}
