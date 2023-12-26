import express from "express";

import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import { getAllUnis, updateUni } from "../controllers/unis";


export default (router: express.Router) => {
    router.get('/unis', getAllUnis);
    router.patch('/unis/:id', updateUni);
};