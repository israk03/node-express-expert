import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo = async(req: Request, res: Response)=>{
    try {
            const result = await todoServices.createTodo(req.body)
    
            res.status(200).json({
                success: true,
                data: result.rows[0]
            })
            
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message
            })
    
            
        }
}

const getTodo = async(req: Request, res: Response)=>{
    try {
        const result  = await todoServices.getTodo();

        res.status(200).json({
            success: true,
            data: result.rows
        })
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}

const getSingleTodo = async(req: Request, res: Response) =>{
    const id = req.params.id;
    try {
            const result = await todoServices.getSingleTodo(id!);
    
            if(result.rows.length === 0){
                res.status(500).json({
                    success: false,
                    message: "TODO not found."
                })
            }else{
                res.status(200).json({
                    success: true,
                    message: "TODO found.",
                    data: result.rows[0]
                })
            }
    
            
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message
            })
            
        }
}

const updateTodo = async(req: Request, res: Response)=>{
    const id = req.params.id;

    try {
        const result = await todoServices.updateTodo(req.body, id!);
        

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "TODO couldn't updated."
            })
        } else {
            res.status(200).json({
                success: true,
                message: "TODO updated",
                data: result.rows[0]
            })
        }
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}

const deleteTodo = async(req: Request, res: Response)=>{
    const id = req.params.id;
    try {
        const result = await todoServices.deleteTodo(id!);

        if(result.rowCount === 0){
            res.status(404).json({
                success: false,
                message: "TODO NOT FOUND."
            })
        }else{
            res.status(200).json({
                success: true,
                message: "TODO deleted successfully.",
                data: result.rows,
            })
        }
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const todoControllers = {
    createTodo,
    getTodo,
    getSingleTodo,
    updateTodo,
    deleteTodo,
}