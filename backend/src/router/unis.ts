import express from "express";


import { getAllUniNames, getUni, getUniID, updateUni, getAllUnis } from "../controllers/unis";




export default (router: express.Router) => {
    router.use(express.json());
    router.get('/uninames', getAllUniNames);  //works
    router.post('/uni', getUni);   //works
    router.get('/unis', getAllUnis); //works
    router.get('/uni/id/:id', getUniID);  //works
    router.patch('/unis/:id', updateUni);  //works
};