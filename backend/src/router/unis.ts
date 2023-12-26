import express from "express";


import { getAllUnis, getUni, getUniID, updateUni } from "../controllers/unis";




export default (router: express.Router) => {
    router.get('/unis', getAllUnis);  //works
    router.get('/uni/:name', getUni);   //doesnt work
    router.get('/uni/id/:id', getUniID);  //works
    router.patch('/unis/:id', updateUni);  //works
};