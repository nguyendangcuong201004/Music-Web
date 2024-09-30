import { Router } from "express";
import * as controller from "../../controllers/client/song.controller"

const route: Router = Router();

route.get("/:slug", controller.list)

export const songRoutes = route;