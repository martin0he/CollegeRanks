import express from "express";

import {
  getAllUsers,
  deleteUser,
  updateUser,
  getUserEmail,
  verify,
  getUsername,
} from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers); //gets all users
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser); //deletes a user only when logged in as that user
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser); //updates a user only when logged in as that user
  router.get("/user/:email", getUserEmail); //get a user [supply email in link]
  router.get("/verify", verify); //verify if a user is logged in
  router.get("/username", getUsername); //get a user's username. if auth, returns username or GUEST
};
