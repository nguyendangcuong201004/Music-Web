import { Request, Response } from "express"
import Account from "../../models/account.model"
import Role from "../../models/role.model"
import { systemConfig } from "../../config/system"
import { hashPassword } from "../../helpers/hashPassword.helper"
import { generateHelper } from "../../helpers/generate.helper"
import { ALL_PERMISSIONS, STAFF_PERMISSIONS } from "../../helpers/permissions.helper"

// [GET] /admin/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
    if (req.cookies.token) {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
        return;
    }

    res.render("admin/pages/auth/login.pug", {
        pageTitle: "Đăng nhập"
    })
}

// [POST] /admin/auth/login
export const loginPost = async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email;
    const password = hashPassword(req.body.password);

    const user = await Account.findOne({
        email: email,
        deleted: false,
    });

    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    if (password != user.password) {
        req.flash("error", "Mật khẩu không chính xác!");
        res.redirect("back");
        return;
    }

    if (user.status != "active") {
        req.flash("error", "Tài khoản đã bị khóa!");
        res.redirect("back");
        return;
    }

    res.cookie("token", user.token);
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`)
}

// [GET] /admin/auth/logout
export const logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
}

// [GET] /admin/auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
    if (req.cookies.token) {
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
        return;
    }

    res.render("admin/pages/auth/register.pug", {
        pageTitle: "Đăng ký"
    })
}

// [POST] /admin/auth/register
export const registerPost = async (req: Request, res: Response): Promise<void> => {

    req.body.fullName = `${req.body.fullName}`.trim();
    const email = `${req.body.email}`.trim().toLowerCase();

    if (!req.body.fullName || req.body.fullName.length < 5) {
        req.flash("error", "Vui lòng nhập họ tên có ít nhất 5 kí tự!");
        res.redirect("back");
        return;
    }

    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email của bạn!");
        res.redirect("back");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        req.flash("error", "Email không đúng định dạng!");
        res.redirect("back");
        return;
    }

    if (!req.body.password || req.body.password.length < 6) {
        req.flash("error", "Mật khẩu phải có ít nhất 6 kí tự!");
        res.redirect("back");
        return;
    }

    if (req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Xác nhận mật khẩu không khớp!");
        res.redirect("back");
        return;
    }

    const emailExists = await Account.findOne({
        email: email,
        deleted: false,
    });

    if (emailExists) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
    }

    // Tài khoản đầu tiên của hệ thống -> Quản trị viên cao nhất (full quyền)
    // Các tài khoản sau -> Nhân viên (chỉ CRUD chủ đề, bài hát, ca sĩ)
    const accountCount = await Account.countDocuments({ deleted: false });

    let roleId: string;

    if (accountCount === 0) {
        let superRole = await Role.findOne({
            title: "Quản trị viên cao nhất",
            deleted: false,
        });

        if (!superRole) {
            superRole = new Role({
                title: "Quản trị viên cao nhất",
                description: "Có toàn quyền trong hệ thống",
                permissions: ALL_PERMISSIONS,
            });
            await superRole.save()
        }

        roleId = superRole.id;
    }
    else {
        let staffRole = await Role.findOne({
            title: "Nhân viên",
            deleted: false,
        });

        if (!staffRole) {
            staffRole = new Role({
                title: "Nhân viên",
                description: "Chỉ quản lý chủ đề, bài hát và ca sĩ",
                permissions: STAFF_PERMISSIONS,
            });
            await staffRole.save()
        }

        roleId = staffRole.id;
    }

    const accountObject = {
        fullName: req.body.fullName,
        email: email,
        password: hashPassword(req.body.password),
        phone: req.body.phone,
        token: generateHelper.generateRandomString(30),
        roleId: roleId,
        status: "active",
    };

    const account = new Account(accountObject);
    await account.save()

    // Đăng ký thành công thì đăng nhập luôn
    res.cookie("token", account.token);
    req.flash("success", "Đăng ký tài khoản thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`)
}
