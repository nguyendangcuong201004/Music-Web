import { Router } from "express"
import * as controller from "../../controllers/admin/song.controller"
import multer from "multer";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";

const route: Router = Router()
const upload = multer();

route.get("/", controller.index)

route.get("/detail/:songId", controller.detail)

route.patch("/change-status/:status/:songId", controller.changeStatus)

route.get("/delete/:songId", controller.deleteSong)

route.get("/create", controller.create)

route.post("/create", upload.single('avatar'), uploadSingle, controller.createPost)

export const songRoutes = route;