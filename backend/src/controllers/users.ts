import express from "express";


import { deleteUserById, getUserByEmail, getUserById, getUsers, getUserBySessionToken } from "../db/users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deleteUser);
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);
        user.username = username;
        await user.save();

        return res.status(200).json(user).end();
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUserEmail = async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.body;
        const user = await getUserByEmail(email);
        return res.status(200).json(user);
    } catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const verify = async (req: express.Request, res: express.Response) => {
    try {
    const sessionToken = req.cookies["CR-AUTH"];
      if (!sessionToken) {
        // No session token provided, return false
        return res.status(400).json(false);
      }
  
      const existingUser = await getUserBySessionToken(sessionToken);
  
      // Return true if a user is found, indicating successful authentication
      return res.status(200).json(Boolean(existingUser));
    } catch (error) {
      // Log any errors that occur during the authentication process
      console.log(error);
      return false;
    }
  };
  