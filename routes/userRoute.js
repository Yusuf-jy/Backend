import express from 'express';
import { createU, createUser, deluser, getdata, iddata } from '../controllers/usercontroller.js';

const router = express.Router();


router.post('/above',createUser) 
router.get('/data', getdata) 
router.get('/data/:id',iddata)
router.put('/up/:id',createU)
router.delete('/remove/:id',deluser)



export default router;
