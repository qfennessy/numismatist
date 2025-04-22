import express, { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import { Coin } from '../models/coin';

const router = express.Router();
const upload = multer({ dest: '../uploads/' });
const coins: Coin[] = [];

const coinSchema = Joi.object({
  name: Joi.string().required(),
  origin: Joi.string().valid('Roman','Greek','Other').required(),
  period: Joi.string().required(),
  year: Joi.number().allow(null),
  metal: Joi.string().valid('Gold','Silver','Bronze','Copper','Other').required(),
  denomination: Joi.string().required(),
  emperor: Joi.string().optional(),
  description: Joi.string().required(),
  condition: Joi.string().valid('Mint','Fine','Very Fine','Extremely Fine','Good','Fair','Poor').required(),
  diameter: Joi.number().required(),
  weight: Joi.number().required(),
  obverseDescription: Joi.string().required(),
  reverseDescription: Joi.string().required(),
  acquisitionDate: Joi.string().isoDate().required(),
  acquisitionPrice: Joi.number().required(),
  estimatedValue: Joi.number().required(),
  images: Joi.array().items(Joi.object()).default([]),
  tags: Joi.array().items(Joi.string()).default([]),
  notes: Joi.array().items(Joi.object()).default([]),
  provenance: Joi.array().items(Joi.object()).default([]),
  mint: Joi.object().optional(),
  isPublic: Joi.boolean().required(),
});

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json(coins);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const coin = coins.find(c => c.id === req.params.id);
  if (!coin) {
    res.status(404).json({ message: 'Coin not found' });
    return;
  }
  res.json(coin);
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = coinSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  const coin: Coin = { id: uuidv4(), ...value } as Coin;
  coins.push(coin);
  res.status(201).json(coin);
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  const index = coins.findIndex(c => c.id === req.params.id);
  if (index < 0) {
    res.status(404).json({ message: 'Coin not found' });
    return;
  }
  const { error, value } = coinSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  coins[index] = { id: req.params.id, ...value } as Coin;
  res.json(coins[index]);
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const index = coins.findIndex(c => c.id === req.params.id);
  if (index < 0) {
    res.status(404).json({ message: 'Coin not found' });
    return;
  }
  coins.splice(index, 1);
  res.status(204).send();
});

// Image upload endpoint
router.post('/:id/images', upload.array('images'), (req: Request, res: Response, next: NextFunction) => {
  const files = (req as any).files;
  const images = files.map((file: Express.Multer.File) => ({ id: uuidv4(), url: `/uploads/${file.filename}`, side: 'Full', isPrimary: false }));
  // In a real app, you'd persist images to the coin
  res.status(201).json(images);
});

export default router;
