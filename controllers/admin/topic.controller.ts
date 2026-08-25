import { Request, Response } from "express"
import Topic from "../../models/topic.model"
import Song from "../../models/song.model"
import { checkPermission, notPermission } from "../../middlewares/admin/auth.middleware"

export const index = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "topics_view")) {
        notPermission(res);
        return;
    }

    const topics = await Topic.find({
        deleted: false,
    })

    res.render("admin/pages/topics/index.pug", {
        pageTitle: "Quản lý chủ đề",
        topics: topics
    })
}

export const changeStatus = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "topics_edit")) {
        notPermission(res);
        return;
    }

    const status = req.params.status;
    const topicId = req.params.topicId;

    await Topic.updateOne({
        _id: topicId,
        deleted: false
    }, {    
        status: status
    })

    res.redirect("back")
}

export const detail = async (req: Request, res: Response): Promise<void> => {
    const topicId = req.params.topicId;

    const topic = await Topic.findOne({
        _id: topicId,
    });


    res.render("admin/pages/topics/detail.pug", {
        pageTitle: 'Spotify Topics',
        topic: topic
    })

}

export const create = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "topics_create")) {
        notPermission(res);
        return;
    }

    res.render("admin/pages/topics/create.pug", {
        pageTitle: `Spotify's Topics`
    })
}

export const createPost = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "topics_create")) {
        notPermission(res);
        return;
    }

    const topicObject = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        avatar: req.body.thumbnail
    }

    const topic = new Topic(topicObject);
    await topic.save()


    req.flash('success', `Spotify đã thêm ${topicObject.title} thành công!`);
    res.redirect("back")
}

export const edit = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "topics_edit")) {
        notPermission(res);
        return;
    }

    const topicId = req.params.topicId;
    
    const topic = await Topic.findOne({
        _id: topicId,
        deleted: false,
    })
    res.render("admin/pages/topics/edit.pug", {
        pageTitle: `Spotify's Topics`,
        topic: topic
    })
}

export const editPatch = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "topics_edit")) {
        notPermission(res);
        return;
    }

    const topicId = req.params.topicId;
    console.log(topicId)

    const topicObject = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        avatar: req.body.thumbnail
    }

    await Topic.updateOne({
        _id: topicId,
    }, topicObject)

    req.flash('success', `Spotify đã cập nhật thành công!`);
    res.redirect("back")
}


export const deleteTopic = async (req: Request, res: Response): Promise<void> => {

    if (!checkPermission(res, "topics_delete")) {
        notPermission(res);
        return;
    }

    const topicId = req.params.topicId;

    await Topic.deleteOne({
        _id: topicId
    })

    req.flash('success', `Spotify đã xóa thành công!`);    

    res.redirect("back")
}