import express from 'express';
import * as imageController from '../controllers/imageController';

const router = express.Router();

// Fetches images using the StyleGAN algorithm
router.get('/stylegan/', imageController.getStylegan);

// Fetches images using the StyleGAN2 algorithm
router.get('/stylegan2/', imageController.getStylegan2);

// Fetches images using the ProGAN algorithm
router.get('/progan/', imageController.getProgan);

export default router;
