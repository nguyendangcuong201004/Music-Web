import { Request, Response } from "express"
import Setting from "../../models/setting.model"
import { checkPermission, notPermission } from "../../middlewares/admin/auth.middleware"

export const general = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "settings_view")) {
        notPermission(res);
        return;
    }

    const setting = await Setting.findOne({})

    res.render("admin/pages/settings/general.pug", {
        pageTitle: "Cài đặt chung",
        setting: setting
    })
}

export const generalPatch = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "settings_edit")) {
        notPermission(res);
        return;
    }

    const settingObject = {
        websiteName: req.body.websiteName,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        copyright: req.body.copyright,
    }

    const setting = await Setting.findOne({});

    if (setting) {
        await Setting.updateOne({
            _id: setting.id
        }, settingObject)
    }
    else {
        const newSetting = new Setting(settingObject);
        await newSetting.save()
    }

    req.flash('success', `Spotify đã lưu cài đặt chung thành công!`);
    res.redirect("back")
}
