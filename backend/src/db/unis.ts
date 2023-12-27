import mongoose from "mongoose";

const UniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
});

export const UniModel = mongoose.model("Uni", UniSchema);

export const getUnis = () => UniModel.find(); //works
export const getUniById = (id: string) => UniModel.findById(id); //works

export const getUniByName = async (name: string) => {
  try {
    const regex = new RegExp(name, "i");
    console.log("Searching for university with name:", name);
    const uni = await UniModel.findOne({ name: regex });
    console.log("Search result:", uni);
    return uni;
  } catch (error) {
    console.error("Error getting university by name:", error.message);
    throw error;
  }
};
export const updateUniById = (id: string, values: Record<string, any>) =>
  UniModel.findByIdAndUpdate(id, values); //works
