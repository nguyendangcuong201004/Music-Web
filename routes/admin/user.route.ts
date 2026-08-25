import { Router } from "express"
import * as controller from "../../controllers/admin/user.controller"

const route: Router = Router()

route.get("/", controller.index)

route.patch("/change-status/:status/:userId", controller.changeStatus)

route.get("/create", controller.create)

route.post("/create", controller.createPost)

route.get("/edit/:userId", controller.edit)

route.patch("/edit/:userId", controller.editPatch)

route.get("/delete/:userId", controller.deleteUser)

export const userRoutes = route;
