import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find(); //returns all the users
export const getUserByEmail = (email: string) => UserModel.findOne({ email }); //return user by their email
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  }); //return user by their session token
export const getUserById = (id: string) => UserModel.findById(id); //return user by their id
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject()); //create a user and then return it
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id }); //delete a user by finding it through its id
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values); //update a user's username
