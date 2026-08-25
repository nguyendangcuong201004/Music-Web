import { Request, Response } from "express"
import Role from "../../models/role.model"
import Account from "../../models/account.model"
import { systemConfig } from "../../config/system"
import { checkPermission, notPermission } from "../../middlewares/admin/auth.middleware"

export const index = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "roles_view")) {
        notPermission(res);
        return;
    }

    // Tối ưu N+1: 2 query song song, đếm tài khoản và tra người tạo bằng Map
    const [records, accounts] = await Promise.all([
        Role.find({ deleted: false }),
        Account.find({ deleted: false }),
    ])

    const accountCountMap = new Map<string, number>()
    for (const account of accounts) {
        accountCountMap.set(account.roleId, (accountCountMap.get(account.roleId) || 0) + 1)
    }
    const creatorMap = new Map(accounts.map(account => [account.id, account]))

    for (const record of records) {
        record["countAccount"] = accountCountMap.get(record.id) || 0;
        record["creator"] = creatorMap.get(record.createdBy)?.fullName || "";
    }

    res.render("admin/pages/roles/index.pug", {
        pageTitle: `Nhóm quyền`,
        records: records
    })
}

export const detail = async (req: Request, res: Response): Promise<void> => {
    const roleId = req.params.roleId;

    const record = await Role.findOne({
        _id: roleId,
        deleted: false,
    })

    res.render("admin/pages/roles/detail.pug", {
        pageTitle: `Chi tiết nhóm quyền`,
        record: record
    })
}

export const create = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "roles_create")) {
        notPermission(res);
        return;
    }

    res.render("admin/pages/roles/create.pug", {
        pageTitle: `Spotify's Roles`
    })
}

export const createPost = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "roles_create")) {
        notPermission(res);
        return;
    }

    const roleObject = {
        title: req.body.title,
        description: req.body.description,
    }

    const role = new Role(roleObject);
    await role.save()

    req.flash('success', `Spotify đã thêm nhóm quyền ${roleObject.title} thành công!`);
    res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}

export const edit = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "roles_edit")) {
        notPermission(res);
        return;
    }

    const roleId = req.params.roleId;

    const record = await Role.findOne({
        _id: roleId,
        deleted: false,
    })

    res.render("admin/pages/roles/edit.pug", {
        pageTitle: `Spotify's Roles`,
        record: record
    })
}

export const editPatch = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "roles_edit")) {
        notPermission(res);
        return;
    }

    const roleId = req.params.roleId;

    const roleObject = {
        title: req.body.title,
        description: req.body.description,
    }

    await Role.updateOne({
        _id: roleId,
        deleted: false,
    }, roleObject)

    req.flash('success', `Spotify đã cập nhật nhóm quyền thành công!`);
    res.redirect("back")
}

export const deleteRole = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "roles_delete")) {
        notPermission(res);
        return;
    }

    const roleId = req.params.roleId;

    await Role.updateOne({
        _id: roleId,
    }, {
        deleted: true,
        deletedAt: new Date(),
    })

    req.flash('success', `Spotify đã xóa nhóm quyền thành công!`);

    res.redirect("back")
}

export const permissions = async (req: Request, res: Response): Promise<void> => {

    // Mọi tài khoản admin đều được vào xem trang phân quyền
    const records = await Role.find({
        deleted: false,
    })

    res.render("admin/pages/roles/permissions.pug", {
        pageTitle: `Phân quyền`,
        records: records
    })
}

export const permissionsPatch = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "roles_permissions")) {
        notPermission(res);
        return;
    }

    try {
        const roles = JSON.parse(req.body.roles);

        for (const item of roles) {
            await Role.updateOne({
                _id: item.id,
                deleted: false
            }, {
                permissions: item.permissions
            })
        }

        req.flash('success', `Spotify đã cập nhật phân quyền thành công!`);
        res.redirect("back")
    } catch (error) {
        req.flash('error', `Cập nhật phân quyền thất bại!`);
        res.redirect("back")
    }
}
