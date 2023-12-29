import express from "express";

import {
  getUnis,
  getUniById,
  getUniByName,
  updateUniById,
  UniModel,
  updateUniOverall,
} from "../db/unis";

//works
export const getAllUniNames = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const unis = await getUnis();
    const uniNames = unis.map((uni) => uni.name);
    return res.status(200).json(uniNames);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

//works
export const getAllUnis = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const unis = await getUnis();
    return res.status(200).json(unis);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

//works
export const getUni = async (req: express.Request, res: express.Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name parameter is required." });
    }

    const uni = await getUniByName(name);

    if (uni) {
      return res.status(200).json(uni);
    } else {
      return res.status(404).json({ error: "University not found." });
    }
  } catch (error) {
    console.error("Error getting university by name:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//works
export const getUniID = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const uni = await getUniById(id);
    return res.status(200).json(uni);
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
    const { ratings } = req.body;

    const updatedUniversity = await updateUniById(id, ratings);

    return res.status(200).json(updatedUniversity);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const avg = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    // Find the university by ID
    const university = await UniModel.findById(id);

    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    // Calculate average for each rating subfield
    const averageRatings: Record<string, number> = {};
    for (const [metric, values] of Object.entries(university.rating)) {
      const sum = values.reduce((acc, value) => acc + value, 0);
      const average = sum / values.length || 0; // Handle division by zero
      averageRatings[metric] = average;
    }

    // Calculate weighted average based on weights
    const weights = {
      Academics: 0.16,
      Food: 0.08,
      Dorms: 0.12,
      Social: 0.12,
      Location: 0.15,
      Opportunities: 0.17,
      Clubs: 0.08,
      Safety: 0.12,
    };

    const weightedAverage = Object.entries(weights).reduce(
      (acc, [metric, weight]) => acc + weight * averageRatings[metric],
      0
    );

    // Round the result to two decimal places
    const roundedWeightedAverage = Math.round(weightedAverage * 100) / 100;

    return res.status(200).json(roundedWeightedAverage);
  } catch (error) {
    console.error("Error calculating weighted average:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUniRating = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { overallRating } = req.body;
    const uni = await updateUniOverall(id, overallRating);
    return res.status(200).json(uni).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
