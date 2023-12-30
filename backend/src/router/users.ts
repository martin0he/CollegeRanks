import express from "express";

import { getAllUsers, deleteUser, updateUser, getUserEmail, verify, getUsername } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
    router.get('/user/:email', getUserEmail);
    router.get('/verify', verify);
    router.get('/username', getUsername);
};