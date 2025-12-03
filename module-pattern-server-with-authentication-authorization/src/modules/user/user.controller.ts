import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async(req: Request, res: Response) =>{
    
    try {
        const result = await userServices.createUser(req.body)
            
            return res.status(201).json({
                success: true,
                message: "User inserted successfully.",
                data: result.rows[0],
            })
            
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
            
    }
}

const getUser = async(req: Request, res: Response)=>{
    try {
        const result = await userServices.getUser();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully.",
            data: result.rows,
        })
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error,
        })
    }
}

const getSingleUser = async(req: Request, res: Response) =>{
    const id = req.params.id;

    try {
            const result = await userServices.getSingleUser(id!);
    
            if(result.rows.length === 0){
                res.status(404).json({
                    success: false,
                    message: "User not found."
                })
            }else{
                res.status(200).json({
                    success: true,
                    message: "User found.",
                    data: result.rows[0],
                })
            }
            
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
            
        }
}

const updateUser = async(req: Request, res: Response)=>{
    const id = req.params.id;
    try {
        const result = await userServices.updateUser(req.body, id!)
        if(result.rows.length===0){
            res.status(400).json({
            success: false,
            message: "User not updated."
        })
        }else{
            res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0]
        })
        }
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const deleteUser = async(req: Request, res: Response)=>{
    const id = req.params.id;
    try {
        const result = await userServices.deleteUser(id!);

        if(result.rowCount === 0){
            res.status(404).json({
                success: false,
                message: "User not found."
            })
        }else{
            res.status(200).json({
                success: true,
                message: "User deleted successfully.",
                data: result.rows,
            })
        }
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}


export const userControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
}