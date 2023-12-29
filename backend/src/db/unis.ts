import mongoose from "mongoose";

const UniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: {
    Academics: { type: [Number], required: true },
    Food: { type: [Number], required: true },
    Dorms: { type: [Number], required: true },
    Social: { type: [Number], required: true },
    Location: { type: [Number], required: true },
    Opportunities: { type: [Number], required: true },
    Clubs: { type: [Number], required: true },
    Safety: { type: [Number], required: true },
  },
  country: { type: String, required: false },
  overallRating: { type: [Number], required: true },
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

export const updateUniById = async (
  id: string,
  ratings: Record<string, number>
) => {
  const updatedUniversity = await UniModel.findByIdAndUpdate(
    id,
    {
      $push: {
        ...Object.entries(ratings).reduce(
          (acc, [metric, value]) => ({ ...acc, [`rating.${metric}`]: value }),
          {}
        ),
      },
    },
    { new: true }
  ); 
};

export const updateUniOverall = (id: string, rating: Number) =>
  UniModel.findByIdAndUpdate(
    id,
    { $push: { overallRating: rating } },
    { new: true } // Set to true to return the modified document rather than the original
  );
 