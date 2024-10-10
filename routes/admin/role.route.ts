import { Router } from "express"
import * as controller from "../../controllers/admin/role.controller"

const route: Router = Router()

route.get("/", controller.index)

route.get("/permissions", controller.permissions)

export const roleRoutes = route;