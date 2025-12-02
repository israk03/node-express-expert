import express, { Request, Response } from "express";
import {Pool} from "pg"
import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(process.cwd(), ".env")});



const app = express();
const port = 5000;

// parser
app.use(express.json());

// DB
const pool = new Pool({
  connectionString:
    `${process.env.CONNECTION_STR}`
});


const initDB = async() =>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `)

    await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `)
}

initDB();

app.get("/",(req: Request, res: Response)=>{
    res.send("Hello Next Level Developers.")
})

//! ------------>> user crud
// create user route
app.post("/users", async(req: Request, res: Response)=>{
    const {name, email, age, phone, address} = req.body;

    try {
        const result = await pool.query(
            `
                INSERT INTO users(name, email, age, phone, address)
                VALUES($1,$2, $3, $4, $5)
                RETURNING *
            `,
            [name, email, age, phone, address]
        )
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
})

// get users route
app.get("/users", async(req: Request, res: Response)=>{
    try {
        const result = await pool.query(
            `
                SELECT * FROM users

            `)
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
})

// get specific user route
app.get("/users/:id", async(req: Request, res: Response)=>{
    try {
        const result = await pool.query(
            `
                SELECT * FROM users
                WHERE id = $1
            `,
            [req.params.id]
        )

        // console.log(result.rows)

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
})

// put user route
app.put("/users/:id", async(req: Request, res: Response)=>{
    const {name, email} = req.body;
    // console.log(name, email);
    try {
        const result = await pool.query(
            `
                UPDATE users
                SET name=$1, email=$2
                WHERE id=$3
                RETURNING *
            `,
            [name, email, req.params.id]
        )
        console.log("result", result)
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
})

// delete user route
app.delete("/users/:id", async(req: Request, res: Response)=>{
    try {
        const result = await pool.query(
            `
                DELETE FROM users
                WHERE id = $1
                RETURNING *
            `,
            [req.params.id]
        )

        // console.log(result.rows)

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
})


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