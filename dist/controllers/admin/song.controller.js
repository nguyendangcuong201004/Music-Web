"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.deleteSong = exports.detail = exports.changeStatus = exports.index = void 0;
var song_model_1 = __importDefault(require("../../models/song.model"));
var singer_mode_1 = __importDefault(require("../../models/singer.mode"));
var topic_model_1 = __importDefault(require("../../models/topic.model"));
var system_1 = require("../../config/system");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var songs, _i, songs_1, song, singer, topic;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, song_model_1.default.find({
                    deleted: false,
                })];
            case 1:
                songs = _a.sent();
                _i = 0, songs_1 = songs;
                _a.label = 2;
            case 2:
                if (!(_i < songs_1.length)) return [3 /*break*/, 6];
                song = songs_1[_i];
                return [4 /*yield*/, singer_mode_1.default.findOne({
                        _id: song.singerId,
                        deleted: false,
                    })];
            case 3:
                singer = _a.sent();
                return [4 /*yield*/, topic_model_1.default.findOne({
                        _id: song.topicId,
                        deleted: false
                    })];
            case 4:
                topic = _a.sent();
                song["topic"] = topic.title;
                song["singer"] = singer.fullName;
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                res.render("admin/pages/songs/index.pug", {
                    pageTitle: "Spotify's Songs",
                    songs: songs
                });
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var changeStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var songId, status;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                songId = req.params.songId;
                status = req.params.status;
                return [4 /*yield*/, song_model_1.default.updateOne({
                        _id: songId,
                        deleted: false,
                    }, {
                        status: status
                    })];
            case 1:
                _a.sent();
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.changeStatus = changeStatus;
var detail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var songId, song, singer, topic;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                songId = req.params.songId;
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: songId,
                        deleted: false,
                    })];
            case 1:
                song = _a.sent();
                return [4 /*yield*/, singer_mode_1.default.findOne({
                        _id: song.singerId,
                        deleted: false,
                    })];
            case 2:
                singer = _a.sent();
                return [4 /*yield*/, topic_model_1.default.findOne({
                        _id: song.topicId,
                        deleted: false,
                    })];
            case 3:
                topic = _a.sent();
                res.render("admin/pages/songs/detail.pug", {
                    pageTitle: "".concat(song.title),
                    song: song,
                    singer: singer,
                    topic: topic
                });
                return [2 /*return*/];
        }
    });
}); };
exports.detail = detail;
var deleteSong = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var songId, song;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                songId = req.params.songId;
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: songId,
                        deleted: false,
                    })];
            case 1:
                song = _a.sent();
                return [4 /*yield*/, song_model_1.default.updateOne({
                        _id: songId
                    }, {
                        deleted: true
                    })];
            case 2:
                _a.sent();
                req.flash("success", "Spotify \u0111\u00E3 x\u00F3a ".concat(song.title, " th\u00E0nh c\u00F4ng!"));
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.deleteSong = deleteSong;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var topics, singers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, topic_model_1.default.find({
                    deleted: false
                })];
            case 1:
                topics = _a.sent();
                return [4 /*yield*/, singer_mode_1.default.find({
                        deleted: false,
                    })];
            case 2:
                singers = _a.sent();
                res.render("admin/pages/songs/create.pug", {
                    pageTitle: "Spotify Upload",
                    topics: topics,
                    singers: singers
                });
                return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var song;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.body.avatar) {
                    req.body.avatar = req.body.avatar[0];
                }
                if (req.body.audio) {
                    req.body.audio = req.body.audio[0];
                }
                song = new song_model_1.default(req.body);
                return [4 /*yield*/, song.save()];
            case 1:
                _a.sent();
                res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/songs"));
                return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var songId, song, topicOfSong, singerOfSong, topics, singers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                songId = req.params.songId;
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: songId,
                        deleted: false,
                    })];
            case 1:
                song = _a.sent();
                return [4 /*yield*/, topic_model_1.default.findOne({
                        _id: song.topicId,
                        deleted: false,
                    })];
            case 2:
                topicOfSong = _a.sent();
                return [4 /*yield*/, singer_mode_1.default.findOne({
                        _id: song.singerId,
                        deleted: false,
                    })];
            case 3:
                singerOfSong = _a.sent();
                return [4 /*yield*/, topic_model_1.default.find({
                        deleted: false
                    })];
            case 4:
                topics = _a.sent();
                return [4 /*yield*/, singer_mode_1.default.find({
                        deleted: false,
                    })];
            case 5:
                singers = _a.sent();
                res.render("admin/pages/songs/edit.pug", {
                    pageTitle: "Spotify Update",
                    topicOfSong: topicOfSong,
                    singerOfSong: singerOfSong,
                    song: song,
                    topics: topics,
                    singers: singers,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.edit = edit;
var editPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var songId, song;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                songId = req.params.songId;
                if (req.body.avatar) {
                    req.body.avatar = req.body.avatar[0];
                }
                if (req.body.audio) {
                    req.body.audio = req.body.audio[0];
                }
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: songId,
                        deleted: false,
                    })];
            case 1:
                song = _a.sent();
                return [4 /*yield*/, song_model_1.default.updateOne({
                        _id: songId,
                        deleted: false,
                    }, req.body)];
            case 2:
                _a.sent();
                req.flash("success", "Spotify \u0111\u00E3 c\u1EADp nh\u1EADt ".concat(song.title, " th\u00E0nh c\u00F4ng!"));
                res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/songs"));
                return [2 /*return*/];
        }
    });
}); };
exports.editPatch = editPatch;
