import express from "express";


import { getAllUniNames, getUni, getUniID, updateUni, getAllUnis, avg, updateUniRating } from "../controllers/unis";




export default (router: express.Router) => {
    router.use(express.json());
    router.get('/uninames', getAllUniNames);  //works
    router.post('/uni', getUni);   //works
    router.get('/unis', getAllUnis); //works
    router.get('/uni/id/:id', getUniID);  //works
    router.patch('/uni/ratings/:id', updateUni);  //works
    router.post('/uni/rating/:id', avg);  
    router.patch('/uni/rating/:id', updateUniRating);
};