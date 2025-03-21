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
exports.songRoutes = void 0;
var express_1 = require("express");
var controller = __importStar(require("../../controllers/admin/song.controller"));
var multer_1 = __importDefault(require("multer"));
var uploadCloud_middleware_1 = require("../../middlewares/admin/uploadCloud.middleware");
var route = (0, express_1.Router)();
var upload = (0, multer_1.default)();
route.get("/", controller.index);
route.get("/detail/:songId", controller.detail);
route.patch("/change-status/:status/:songId", controller.changeStatus);
route.get("/delete/:songId", controller.deleteSong);
route.get("/create", controller.create);
route.post("/create", upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), uploadCloud_middleware_1.uploadFields, controller.createPost);
route.get("/edit/:songId", controller.edit);
route.patch("/edit/:songId", upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), uploadCloud_middleware_1.uploadFields, controller.editPatch);
exports.songRoutes = route;
