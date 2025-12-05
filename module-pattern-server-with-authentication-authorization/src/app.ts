import express, { Request, Response } from "express";

import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import initDB from "./config/db";
import logger from "./middleware/logger";





const app = express();


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


//!-------------->> auth routes
app.use("/auth", authRoutes);


// not found route
app.use((req: Request, res: Response)=>{
    res.status(404).json({
        success: false,
        message: "Route not found."
    })
})




export default app;