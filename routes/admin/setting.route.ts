import { Router } from "express"
import * as controller from "../../controllers/admin/setting.controller"

const route: Router = Router()

route.get("/general", controller.general)

route.patch("/general", controller.generalPatch)

export const settingRoutes = route;
