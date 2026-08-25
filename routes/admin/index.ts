import { Express } from "express";
import { dashboardRoutes } from "./dashboard.route";
import { systemConfig } from "../../config/system";
import { topicRoutes } from "./topic.route";
import { roleRoutes } from "./role.route";
import { songRoutes } from "./song.route"
import { uploadRoutes } from "./upload.route";
import { singerRoutes } from "./singer.route";
import { accountRoutes } from "./account.route";
import { userRoutes } from "./user.route";
import { settingRoutes } from "./setting.route";
import { authRoutes } from "./auth.route";
import { myAccountRoutes } from "./my-account.route";
import { requireAuth } from "../../middlewares/admin/auth.middleware";

const adminRoutes = (app: Express): void => {

    const path = systemConfig.prefixAdmin

    app.use(`/${path}/dashboard`, requireAuth, dashboardRoutes)

    app.use(`/${path}/topics`, requireAuth, topicRoutes)

    app.use(`/${path}/roles`, requireAuth, roleRoutes);

    app.use(`/${path}/songs`, requireAuth, songRoutes);

    app.use(`/${path}/upload`, requireAuth, uploadRoutes);

    app.use(`/${path}/singers`, requireAuth, singerRoutes);

    app.use(`/${path}/accounts`, requireAuth, accountRoutes);

    app.use(`/${path}/users`, requireAuth, userRoutes);

    app.use(`/${path}/settings`, requireAuth, settingRoutes);

    app.use(`/${path}/my-account`, requireAuth, myAccountRoutes);

    // Route đăng nhập/đăng xuất không cần kiểm tra đăng nhập
    app.use(`/${path}/auth`, authRoutes);
}

export default adminRoutes
