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
exports.listenPatch = exports.playlist = exports.favoritePatch = exports.like = exports.songDetail = exports.list = void 0;
var topic_model_1 = __importDefault(require("../../models/topic.model"));
var song_model_1 = __importDefault(require("../../models/song.model"));
var singer_mode_1 = __importDefault(require("../../models/singer.mode"));
var favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
var list = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var slug, topic, songs, _i, songs_1, song, singer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                slug = req.params.slug;
                return [4 /*yield*/, topic_model_1.default.findOne({
                        slug: slug,
                        deleted: false,
                    })];
            case 1:
                topic = _a.sent();
                return [4 /*yield*/, song_model_1.default.find({
                        topicId: topic.id,
                        deleted: false,
                    })];
            case 2:
                songs = _a.sent();
                _i = 0, songs_1 = songs;
                _a.label = 3;
            case 3:
                if (!(_i < songs_1.length)) return [3 /*break*/, 6];
                song = songs_1[_i];
                return [4 /*yield*/, singer_mode_1.default.findOne({
                        _id: song.singerId,
                        deleted: false,
                    })];
            case 4:
                singer = _a.sent();
                song["singer"] = singer.fullName;
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                res.render("client/pages/songs/list.pug", {
                    pageTitle: "Nh\u1EA1c ".concat(topic.title),
                    topic: topic,
                    songs: songs
                });
                return [2 /*return*/];
        }
    });
}); };
exports.list = list;
var songDetail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var slug, song, singer, topic, favoriteSong;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                slug = req.params.slug;
                return [4 /*yield*/, song_model_1.default.findOne({
                        slug: slug,
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
                return [4 /*yield*/, favorite_song_model_1.default.findOne({
                        songId: song.id,
                        deleted: false,
                    })];
            case 4:
                favoriteSong = _a.sent();
                if (favoriteSong) {
                    song["favorite"] = true;
                }
                else
                    song["favorite"] = false;
                res.render("client/pages/songs/detail.pug", {
                    pageTitle: "".concat(song.title, " - ").concat(singer.fullName),
                    song: song,
                    singer: singer,
                    topic: topic
                });
                return [2 /*return*/];
        }
    });
}); };
exports.songDetail = songDetail;
var like = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status, song, updateLike;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.songId;
                status = req.params.status;
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: id,
                        deleted: false,
                        status: "active",
                    })];
            case 1:
                song = _a.sent();
                updateLike = song.like;
                if (status == "like") {
                    updateLike += 1;
                }
                else
                    updateLike -= 1;
                return [4 /*yield*/, song_model_1.default.updateOne({
                        _id: id
                    }, {
                        like: updateLike
                    })];
            case 2:
                _a.sent();
                res.json({
                    code: 200,
                    message: "Return after like song!",
                    like: updateLike
                });
                return [2 /*return*/];
        }
    });
}); };
exports.like = like;
var favoritePatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, id, favoriteSong;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = req.params.status;
                id = req.params.songId;
                if (!(status == "favorite")) return [3 /*break*/, 2];
                favoriteSong = new favorite_song_model_1.default({
                    userId: "",
                    songId: id,
                });
                return [4 /*yield*/, favoriteSong.save()];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, favorite_song_model_1.default.deleteOne({
                    songId: id
                })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                res.json({
                    code: 200,
                    message: status == "favorite" ? "Đã thêm vào thư viện" : "Đã xóa khỏi thư viện"
                });
                return [2 /*return*/];
        }
    });
}); };
exports.favoritePatch = favoritePatch;
var playlist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var myPlaylist, _i, myPlaylist_1, item, song, singer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, favorite_song_model_1.default.find({
                    deleted: false,
                })];
            case 1:
                myPlaylist = _a.sent();
                _i = 0, myPlaylist_1 = myPlaylist;
                _a.label = 2;
            case 2:
                if (!(_i < myPlaylist_1.length)) return [3 /*break*/, 6];
                item = myPlaylist_1[_i];
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: item.songId,
                        deleted: false,
                    })];
            case 3:
                song = _a.sent();
                item["song"] = song;
                return [4 /*yield*/, singer_mode_1.default.findOne({
                        _id: song.singerId,
                        deleted: false,
                    })];
            case 4:
                singer = _a.sent();
                item["singer"] = singer;
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                res.render("client/pages/songs/favorite.pug", {
                    pageTitle: "My Playlist",
                    myPlaylist: myPlaylist,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.playlist = playlist;
var listenPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, song, listenUpdate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.songId;
                return [4 /*yield*/, song_model_1.default.findOne({
                        _id: id,
                        status: "active",
                        deleted: false,
                    })];
            case 1:
                song = _a.sent();
                listenUpdate = song.listen + 1;
                return [4 /*yield*/, song_model_1.default.updateOne({
                        _id: id,
                        status: "active",
                        deleted: false,
                    }, {
                        listen: listenUpdate
                    })];
            case 2:
                _a.sent();
                res.json({
                    code: 200,
                    message: "Đã cập nhật số stream",
                    listen: listenUpdate
                });
                return [2 /*return*/];
        }
    });
}); };
exports.listenPatch = listenPatch;
