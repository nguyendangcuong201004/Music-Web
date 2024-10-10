import { Request, Response } from "express"

export const index = async (req: Request, res: Response): Promise<void> => {

    res.render("admin/pages/roles/index.pug", {
        pageTitle: `Spofity's Roles`
    })    
}

export const permissions = async (req: Request, res: Response): Promise<void> => {

    res.render("admin/pages/roles/permissions.pug", {
        pageTitle: `Spofity's Roles`
    })    
}