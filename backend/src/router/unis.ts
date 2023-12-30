import express from "express";


import { getAllUniNames, getUni, getUniID, updateUni, getAllUnis, updateUniRating, getUniStats, getUniOverall } from "../controllers/unis";
import { isAuthenticated } from "../middlewares/index";




export default (router: express.Router) => {
    router.use(express.json());
    router.get('/unis/names', getAllUniNames);  
    router.post('/uni', getUni);   
    router.get('/unis', getAllUnis); 
    router.get('/uni/id/:id', getUniID);  
    router.patch('/uni/metrics/:id', isAuthenticated ,updateUni);  
    router.patch('/uni/overall/:id', isAuthenticated, updateUniRating);
    router.get('/uni/metrics/:id', getUniStats);
    router.get('/uni/overall/:id', getUniOverall);
}; 