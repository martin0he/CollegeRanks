import mongoose from "mongoose";

const UniSchema = new mongoose.Schema({
  NAME: { type: String, required: true },
  RATING: { type: Number, required: true },
});

export const UniModel = mongoose.model("Uni", UniSchema);

export const getUnis = () => UniModel.find();

export const getUniByName = (name: string) => UniModel.findOne({ name });

export const updateUniByName = (name: string, values: Record<number, any>) => UniModel.findByIdAndUpdate(name, values);