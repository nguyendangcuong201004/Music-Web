import { Router } from "express";
import * as controller from "../../controllers/client/song.controller"

const route: Router = Router();

route.get("/:slug", controller.list)

route.get("/detail/:slug", controller.songDetail)

route.patch("/like/:status/:songId", controller.like)

export const songRoutes = route;