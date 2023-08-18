import { Request, Response } from 'express';
import { getImages } from '../utils/fsOperations';

function handleResponse(req: Request, res: Response, sets: string[]) {
  try {
    const images = getImages(sets);
    res.json({ success: true, data: images });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching images:', error.message);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    } else {
      console.error('Unknown error:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }
}

export function getStylegan(req: Request, res: Response) {
  handleResponse(req, res, ['ffhq', 'stylegan']);
}

export function getStylegan2(req: Request, res: Response) {
  handleResponse(req, res, ['ffhq', 'stylegan2']);
}

export function getProgan(req: Request, res: Response) {
  handleResponse(req, res, ['ffhq', 'progan']);
}
