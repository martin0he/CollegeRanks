import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {  //if either password or email arent present
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(  //gets the users token
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);  //compares tokens

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);  //if tokens dont match up, returns error
    }
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();
    res.cookie("CR-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      sameSite: "none",  //necessary for 2 domains to run in CORS
      secure: true,  //necessary for 2 domains to run in CORS
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;  //go in the body of frontend request

    if (!email || !password || !username) {  //if any of email/password/username is missing return error
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);  //returns user entity by the provided email

    if (existingUser) {  //if the user already exists, returns error
      return res.sendStatus(400);
    }

    const salt = random();  //encryption
    const user = await createUser({   //creates new user with details and token
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
