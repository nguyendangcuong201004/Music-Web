import { Router } from "express"
import * as controller from "../../controllers/admin/singer.controller"
import multer from "multer";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";

const route: Router = Router();
const upload = multer();

route.get("/", controller.index)

route.patch("/change-status/:status/:singerId", controller.changeStatus)

route.get("/detail/:singerId", controller.detail)

route.get("/create", controller.create)

route.post("/create", upload.single('avatar'), uploadSingle, controller.createPost)

route.get("/edit/:singerId", controller.edit)

route.patch("/edit/:singerId", upload.single('avatar'), uploadSingle, controller.editPatch)

route.get("/delete/:singerId", controller.deleteSinger)

export const singerRoutes = route;
