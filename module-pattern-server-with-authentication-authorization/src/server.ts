import express, { Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";




const app = express();
const port = config.port;

// parser
app.use(express.json());

// DB
initDB();



app.get("/", logger, (req: Request, res: Response)=>{
    res.send("Hello Next Level Developers.")
})

//! ------------>> user crud
app.use("/users", userRoutes)




//!-------------->> todos crud
// create todo route: post
app.post("/todos", async(req:Request, res: Response)=>{
    const {user_id, title} = req.body;
    try {
        const result = await pool.query(
            `
                INSERT INTO todos(user_id, title)
                VALUES ($1, $2)
                RETURNING *
            `,
            [user_id, title]
        )

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
})

// get all todos: get
app.get("/todos", async(req: Request, res: Response)=>{
    try {
        const result = await pool.query(
            `
                SELECT * FROM todos
            `,
        )

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
})

// get specific todo: get
app.get("/todos/:id", async(req: Request, res: Response)=>{
    try {
        const result = await pool.query(
            `
                SELECT * FROM todos
                WHERE id = $1
            `,
            [req.params.id]
        )

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
})

// update specific toto: put
app.put("/todos/:id", async(req: Request, res: Response)=>{
    const {title} = req.body;

    try {
        const result = await pool.query(
            `
                UPDATE todos
                SET title = $1
                WHERE id = $2
                RETURNING *
            `,
            [title, req.params.id]
        )

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
})

// delete specific todo: delete
app.delete("/todos/:id", async(req: Request, res: Response)=>{
    try {
        const result = await pool.query(
            `
                DELETE FROM todos
                WHERE id = $1
                RETURNING *
            `,
            [req.params.id]
        )

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
})


// not found route
app.use((req: Request, res: Response)=>{
    res.status(404).json({
        success: false,
        message: "Route not found."
    })
})




app.listen(port, ()=>{
    console.log(`App listening on port ${port}.`)
})