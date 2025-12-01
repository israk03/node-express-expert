import express, { Request, Response } from "express";
import {Pool} from "pg"

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_0rAaTM2fwoNU@ep-still-salad-ahv47zsz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})

const app = express();
const port = 5000;

// parser
app.use(express.json());


app.get("/",(req: Request, res: Response)=>{
    res.send("Hello Next Level Developers.")
})


app.post("/", (req: Request, res: Response)=>{
    console.log(req.body);

    res.status(201).json({
        success: true, 
        message: "API is working."
    })
})




app.listen(port, ()=>{
    console.log(`App listening on port ${port}.`)
})