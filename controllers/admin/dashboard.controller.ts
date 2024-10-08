import { Request, Response } from "express"


export const index = async (req: Request, res: Response): Promise<void> => {
    

    res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Tổng quan Spotify"
    })
}