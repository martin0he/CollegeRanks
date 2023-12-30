import express from "express";

import {
  getAllUniNames,
  getUni,
  getUniID,
  updateUni,
  getAllUnis,
  updateUniRating,
  getUniStats,
  getUniOverall,
} from "../controllers/unis";
import { isAuthenticated } from "../middlewares/index";

export default (router: express.Router) => {
  router.use(express.json());
  router.get("/unis/names", getAllUniNames); //returns array of all university names
  router.post("/uni", getUni); //returns a university [supply uni name in req body]
  router.get("/unis", getAllUnis); //returns all universities
  router.get("/uni/id/:id", getUniID); //returns a university [supply uni id in link]
  router.patch("/uni/metrics/:id", isAuthenticated, updateUni); //updates uni metrics arrays only when logged in (middleware)
  router.patch("/uni/overall/:id", isAuthenticated, updateUniRating); //updates uni overall rating array only when logged in (middleware)
  router.get("/uni/metrics/:id", getUniStats); //returns a university's average metric scores [supply uni id in link]
  router.get("/uni/overall/:id", getUniOverall); //returns a university's average overall rating [supply uni id in link]
};
