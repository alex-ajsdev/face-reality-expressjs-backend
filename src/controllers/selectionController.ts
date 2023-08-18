import { Request, Response } from 'express';
import Selection from '../models/selectionModel';

export const getAllSelections = async (req: Request, res: Response) => {
  try {
    const selections = await Selection.find();
    res.status(200).json(selections);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message });
  }
};

export const createSelection = async (req: Request, res: Response) => {
  try {
    const newSelection = new Selection(req.body);
    const savedSelection = await newSelection.save();
    res.status(201).json(savedSelection);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message });
  }
};
