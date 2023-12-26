import express from "express";

import { getUniByName, getUnis } from "../db/unis";

export const getAllUnis = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const unis = await getUnis();
    const uniNames = unis.map((uni) => uni.NAME);
    return res.status(200).json(uniNames);
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
    const { name, newRanking } = req.body;

    if (!name || !newRanking || isNaN(newRanking)) {
      return res.sendStatus(400);
    }

    // Fetch the existing uni by name
    const uni = await getUniByName(name);

    // Check if the uni with the provided name exists
    if (!uni) {
      return res.status(404).json({ message: 'University not found' });
    }

    // Update the uni's ranking
    uni.RATING = Number(newRanking);

    // Save the changes
    await uni.save();

    return res.status(200).json(uni).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};