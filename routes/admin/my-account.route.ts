import { Router } from "express"
import * as controller from "../../controllers/admin/myAccount.controller"
import multer from "multer";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";

const route: Router = Router();
const upload = multer();

route.get("/", controller.index)

route.get("/edit", controller.edit)

route.patch("/edit", upload.single('avatar'), uploadSingle, controller.editPatch)

export const myAccountRoutes = route;
