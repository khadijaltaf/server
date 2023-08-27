import { Router } from "express";
import { blogModel } from "../models/blogs.js";
import { userModel } from '../models/user.js';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';



const mainRouter = Router();
//cz we dont need any authentication 
mainRouter.get('/blogs', async (req, res) => {
    try {

        const data = await blogModel.find();
        const count = await blogModel.count();

        if (count > 0) {
            res.json(data);
        } else {
            res.json({ message: "No post found" });
        }

    }
    catch (error) {
        console.log(error);
    }
});

//single search

mainRouter.get('/blogs/:id', async (req, res) => {
    try {

        let blogId = req.params.id;
        const data = await blogModel.findById({ _id: blogId });
        // const count = await blogModel.count();

        if (data) {
            res.json(data);
        } else {
            res.json({ message: "No post found with specified ID" });
        }

    }
    catch (error) {
        console.log(error);
    }
});

//register
mainRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body; //object destructuring
    const encryptedPassword = await hash(password, 10);

    try {
        const user = await userModel.create({
            username,
            email,
            password: encryptedPassword
        });

        res.status(201).json({ message: "User has been registered successfully", user });
        res.end();

    }
    catch (err) {
        console.log(err);
        res.json({ message: err });
        res.end();
    }
});


//login 

mainRouter.post('/login', async (req, res) => {

    const { username, password } = req.body;


    try {
        const user = await userModel.findOne({ username });

        if (!user) {
            res.status(401).json({ message: "User not found" });
            res.end();
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            res.end();
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token: token });
        res.end();

    }
    catch (err) {
        console.log(err);
    }

});



export default mainRouter;