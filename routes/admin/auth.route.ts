import { Router } from "express"
import * as controller from "../../controllers/admin/auth.controller"

const route: Router = Router()

route.get("/login", controller.login)

route.post("/login", controller.loginPost)

route.get("/register", controller.register)

route.post("/register", controller.registerPost)

route.get("/logout", controller.logout)

export const authRoutes = route
