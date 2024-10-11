import { Router } from "express"
import * as controller from "../../controllers/admin/song.controller"
import multer from "multer";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";
import { uploadFields } from "../../middlewares/admin/uploadCloud.middleware";

const route: Router = Router()
const upload = multer();

route.get("/", controller.index)

route.get("/detail/:songId", controller.detail)

route.patch("/change-status/:status/:songId", controller.changeStatus)

route.get("/delete/:songId", controller.deleteSong)

route.get("/create", controller.create)

route.post("/create", upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), uploadFields, controller.createPost)

route.get("/edit/:songId", controller.edit);

route.patch("/edit/:songId", upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), uploadFields, controller.editPatch);

export const songRoutes = route;