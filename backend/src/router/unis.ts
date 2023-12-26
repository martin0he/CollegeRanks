import express from "express";


import { getAllUnis, getUniName, updateUni } from "../controllers/unis";




export default (router: express.Router) => {
    router.get('/unis', getAllUnis);
    router.get('/uni/:name', getUniName);
    router.patch('/unis/:id', updateUni);
};