import express from "express";

import {
  getUnis,
  getUniById,
  getUniByName,
  updateUniById,
  UniModel,
  updateUniOverall,
} from "../db/unis";

export const getAllUniNames = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const unis = await getUnis(); //gets all university entities in the db
    const uniNames = unis.map((uni) => uni.name); //gets an array of all uni names
    return res.status(200).json(uniNames); //returns the names
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllUnis = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const unis = await getUnis(); //gets all university entities in the db
    return res.status(200).json(unis); //returns an array of all university entities
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUni = async (req: express.Request, res: express.Response) => {
  try {
    const { name } = req.body; // uni name goes in the body of the frontend request
    if (!name) {
      return res.status(400).json({ error: "Name parameter is required." });
    }
    const uni = await getUniByName(name); //returns uni entity from the inputted name
    if (uni) {
      return res.status(200).json(uni); //returns the university
    } else {
      return res.status(404).json({ error: "University not found." });
    }
  } catch (error) {
    console.error("Error getting university by name:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUniID = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const uni = await getUniById(id); // gets the uni based off the id (placed in the axios domain)
    return res.status(200).json(uni); //returns the university
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUni = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { ratings } = req.body; // goes in the body of the frontend request

    const updatedUniversity = await updateUniById(id, ratings); // updates the university (found by id) and updates the metrics arrays

    return res.status(200).json(updatedUniversity);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUniRating = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { overallRating } = req.body; // goes in the body of the frontend request
    const uni = await updateUniOverall(id, overallRating); // updates the university (found by id) and updates its overall rating array
    return res.status(200).json(uni).end(); //returns the updated uni
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUniStats = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const uni = await UniModel.findById(id); //gets the uni by id

    if (!uni) {
      return res.status(404).json({ error: "University not found" }); //if uni doesnt exist, returns error
    }

    // Calculate average for each rating subfield
    const averageRatings: Record<string, string> = {};
    for (const [metric, values] of Object.entries(uni.rating)) {
      const sum = values.reduce((acc, value) => acc + value, 0);
      const average = (sum / values.length || 0).toFixed(2); // Handle division by zero & rounds each value to 2 d.p.
      averageRatings[metric] = average;
    }

    return res.status(200).json(averageRatings); //returns the average for each metric array for the university
  } catch (error) {
    console.error("Error calculating average ratings:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUniOverall = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const uni = await UniModel.findById(id); //gets the uni by id

    if (!uni) {
      return res.status(404).json({ error: "University not found" }); //returns error if uni doesn't exist
    }

    // Calculate average of overallRating
    const overallRating = uni.overallRating || [];
    const sum = overallRating.reduce((acc, value) => acc + value, 0);
    const average = sum / overallRating.length || 0;

    return res.status(200).json({ average }); //returns uni's overall rating
  } catch (error) {
    console.error("Error calculating average overall rating:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
