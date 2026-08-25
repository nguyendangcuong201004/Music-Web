import { Request, Response, NextFunction } from "express";
import Account from "../../models/account.model";
import Role from "../../models/role.model";
import { systemConfig } from "../../config/system";

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.cookies.token) {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    const user = await Account.findOne({
        token: req.cookies.token,
        deleted: false,
        status: "active"
    })

    if (!user) {
        res.clearCookie("token");
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    res.locals.user = user;

    const role = await Role.findOne({
        _id: user.roleId,
        deleted: false,
    })

    res.locals.role = role;

    next();
}

export const checkPermission = (res: Response, permission: string): boolean => {
    const role = res.locals.role;
    return !!(role && role.permissions && role.permissions.includes(permission));
}

export const notPermission = (res: Response): void => {
    res.status(403).render("admin/pages/errors/403.pug", {
        pageTitle: "Không có quyền truy cập"
    });
}
