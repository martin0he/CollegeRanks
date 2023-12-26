import mongoose from "mongoose";

const UniSchema = new mongoose.Schema({
  NAME: { type: String, required: true },
  RATING: { type: Number, required: true },
});

export const UniModel = mongoose.model("Uni", UniSchema);

export const getUnis = () => UniModel.find();  //works
export const getUniById = (id: string) => UniModel.findById(id);  //works
export const getUniByName = (name: string) => UniModel.findOne({ name });
export const updateUniById = (id: string, values: Record<string, any>) => UniModel.findByIdAndUpdate(id, values);  //works
