import { Router } from "express"
import * as controller from "../../controllers/admin/topic.controller"
import multer from "multer";
import { storage } from "../../helpers/storage.helper";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";

const route: Router = Router();
const upload = multer();


route.get("/", controller.index)

route.patch("/change-status/:status/:topicId", controller.changeStatus)

route.get("/detail/:topicId",controller.detail)

route.get("/create",controller.create)

route.post("/create", upload.single('thumbnail'), uploadSingle, controller.createPost)

export const topicRoutes = route;