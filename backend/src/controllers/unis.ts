import express from "express";

import { getUnis, getUniById, getUniByName } from "../db/unis";

//works
export const getAllUnis = async (
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

//doesnt work
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

//works
export const updateUni = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    if (!rating) {
      return res.sendStatus(400);
    }

    const uni = await getUniById(id);
    uni.rating = rating;
    await uni.save();

    return res.status(200).json(uni).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
