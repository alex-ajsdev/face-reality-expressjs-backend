import express, { Request, Response, NextFunction } from 'express';
import * as selectionController from '../controllers/selectionController';

const router = express.Router();

const validateSelectionRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { totalFake, totalFakeFound, totalRealFound, algorithm } = req.body;

  // Check if fields are present and of the correct type
  if (
    typeof totalFake !== 'number' ||
    typeof totalFakeFound !== 'number' ||
    typeof totalRealFound !== 'number' ||
    typeof algorithm !== 'string'
  ) {
    return res
      .status(400)
      .send(
        'Invalid request payload. Please check the fields and their types.'
      );
  }
  next();
};

// Fetches all selections
router.get('/', selectionController.getAllSelections);

// Creates a new selection with validation
router.post('/', validateSelectionRequest, selectionController.createSelection);

export default router;
