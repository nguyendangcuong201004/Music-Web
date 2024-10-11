"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicRoutes = void 0;
var express_1 = require("express");
var controller = __importStar(require("../../controllers/admin/topic.controller"));
var multer_1 = __importDefault(require("multer"));
var uploadCloud_middleware_1 = require("../../middlewares/admin/uploadCloud.middleware");
var route = (0, express_1.Router)();
var upload = (0, multer_1.default)();
route.get("/", controller.index);
route.patch("/change-status/:status/:topicId", controller.changeStatus);
route.get("/detail/:topicId", controller.detail);
route.get("/create", controller.create);
route.post("/create", upload.single('thumbnail'), uploadCloud_middleware_1.uploadSingle, controller.createPost);
route.get("/edit/:topicId", controller.edit);
route.patch("/edit/:topicId", upload.single('thumbnail'), uploadCloud_middleware_1.uploadSingle, controller.editPatch);
route.get("/delete/:topicId", controller.deleteTopic);
exports.topicRoutes = route;
