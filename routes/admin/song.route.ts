import { Router } from "express"
import * as controller from "../../controllers/admin/song.controller"

const route: Router = Router()

route.get("/", controller.index)

route.get("/detail/:songId", controller.detail)

route.patch("/change-status/:status/:songId", controller.changeStatus)

route.get("/delete/:songId", controller.deleteSong)

export const songRoutes = route;