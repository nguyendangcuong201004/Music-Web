import { Router } from "express"
import * as controller from "../../controllers/admin/role.controller"

const route: Router = Router()

route.get("/", controller.index)

route.patch("/permissions", controller.permissionsPatch)

route.get("/permissions", controller.permissions)

route.get("/detail/:roleId", controller.detail)

route.get("/create", controller.create)

route.post("/create", controller.createPost)

route.get("/edit/:roleId", controller.edit)

route.patch("/edit/:roleId", controller.editPatch)

route.get("/delete/:roleId", controller.deleteRole)

export const roleRoutes = route;
