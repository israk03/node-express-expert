import express, { Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";




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
app.use("/todos", todoRoutes)




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