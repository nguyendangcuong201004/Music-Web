import { Router } from "express"
import * as controller from "../../controllers/admin/account.controller"
import multer from "multer";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";

const route: Router = Router();
const upload = multer();

route.get("/", controller.index)

route.patch("/change-status/:status/:accountId", controller.changeStatus)

route.get("/create", controller.create)

route.post("/create", upload.single('avatar'), uploadSingle, controller.createPost)

route.get("/edit/:accountId", controller.edit)

route.patch("/edit/:accountId", upload.single('avatar'), uploadSingle, controller.editPatch)

route.get("/delete/:accountId", controller.deleteAccount)

export const accountRoutes = route;
