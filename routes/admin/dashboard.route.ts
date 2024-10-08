import { Router } from "express"
import * as controller from "../../controllers/admin/dashboard.controller"

const route: Router = Router()

route.get("/", controller.index)

export const dashboardRoutes = route;