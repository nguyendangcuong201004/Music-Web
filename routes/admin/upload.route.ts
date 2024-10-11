import { Router } from "express"
import * as controller from "../../controllers/admin/upload.controller"

import multer from "multer";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";
import { uploadFields } from "../../middlewares/admin/uploadCloud.middleware";

const route: Router = Router()
const upload = multer();

route.post("/",upload.single("file"), uploadSingle, controller.index)

export const uploadRoutes = route;