import { Router } from "express";
import { blogModel } from "../models/blogs.js";

const mainRouter = Router();
//cz we dont need any authentication 
mainRouter.get('/blogs' , async(req, res)=>{
    try{
    const data = await blogModel.find();
    res.json(data);
    res.end();

    }
    catch (error){
        console.log(error);
    }
});

export default mainRouter;