import express from 'express';
import { CreateText, DeleteText, GetTexts, UpdateText } from '../controller/text.controller.js';

const router = express.Router();

router.post('/upload', CreateText);
router.get('/getText',GetTexts);
router.put('/update/:id', UpdateText);
router.delete('/delete/:id', DeleteText);

export default router;