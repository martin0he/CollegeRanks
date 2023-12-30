import express from "express";

import {
  deleteUserById,
  getUserByEmail,
  getUserById,
  getUsers,
  getUserBySessionToken,
} from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers(); //gets all the users in the db

    return res.status(200).json(users); //returns all the users
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params; //user id goes in the axios request domain

    const deletedUser = await deleteUserById(id); //deletes a user

    return res.json(deleteUser); //returns the deletion
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params; //user id goes in the axios request domain eg http....
    const { username } = req.body; // goes in the body of the frontend request

    if (!username) {
      //if there's no username in the body, return error
      return res.sendStatus(400);
    }

    const user = await getUserById(id); //gets user
    user.username = username; //sets the user's username to the username included in the frontend request body
    await user.save(); //saves the updates user

    return res.status(200).json(user).end(); //return the updated user
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUserEmail = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email } = req.body; // goes in the body of the frontend request
    const user = await getUserByEmail(email); //get user
    return res.status(200).json(user); //return user
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const verify = async (req: express.Request, res: express.Response) => {
  try {
    const sessionToken = req.cookies["CR-AUTH"];
    if (!sessionToken) {
      // No session token provided, return false
      return res.status(400).json(false);
    }

    const existingUser = await getUserBySessionToken(sessionToken); //gets the logged in user

    // Return true if a user is found, indicating successful authentication
    return res.status(200).json(Boolean(existingUser));
  } catch (error) {
    // Log any errors that occur during the authentication process
    console.log(error);
    return false;
  }
};

export const getUsername = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies["CR-AUTH"];
    if (!sessionToken) {
      // No session token provided, return GUEST status
      return res.status(400).json("GUEST");
    }

    const existingUser = await getUserBySessionToken(sessionToken); //gets the logged in user
    if (!existingUser) {
      return res.status(400).json("GUEST");
    }

    const username = existingUser.username;
    // Return username if a user is found, indicating successful authentication
    return res.status(200).json(username);
  } catch (error) {
    // Log any errors that occur during the authentication process
    console.log(error);
    return false;
  }
};
